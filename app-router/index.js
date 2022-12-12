'use strict';

const _ = require('lodash');
const fs = require('fs');
const mustache = require('mustache');
const path = require('path');
const util = require('util');
const serveStatic = require('serve-static');
const VError = require('verror').VError;
const appRouter = require('@sap/approuter');
const contentTypeUtil = require('@sap/approuter/lib/utils/content-type');
const loginProvider = require('@sap/approuter/lib/middleware/login-provider');
const logoutProvider = require('@sap/approuter/lib/middleware/logout-provider');
const checkRequest = require('@sap/approuter/lib/utils/check-request');
const pathUtil = require('@sap/approuter/lib/utils/path-util');
const vcapUtils = require('@sap/approuter/lib/utils/vcap-utils');
const singleUseToken = require('@sap/approuter/lib/passport/single-use-token');

function loginCheck(req, res, next) {
    if ((!loginProvider.isLoginRequired(req) && !loginProvider.isExchangeTokenRequired(req)) ||
        (logoutProvider.isLogoutRequest(req) && process.env.LOGOUT_WO_SESSION_TRIGGERS_LOGIN !== 'true')) {
        return next();
    } else if (loginProvider.isExchangeTokenRequired(req)) {
        return loginProvider.exchangeToken(req, next);
    } else if (req.query && req.query.approuterAuthCode) {
        return singleUseToken.createSessionByAuthCode(req, next);
    }
    const authenticationType = pathUtil.pathAuthenticationType(req);
    if ((req.method !== 'GET' && (authenticationType === 'xsuaa' || authenticationType === 'ias')) || checkRequest.isAjaxRequest(req)) {
        return sendUnauthorizedRequest(next, {'X-Login-Required': 'true'});
    }
    loginProvider.getAuthenticator(req, res, function (err, authenticator) {
        if (err) {
            if (err === 401) {
                return sendUnauthorizedRequest(next, {'WWW-Authenticate': 'Basic realm="' + getRealm() + '"'});
            }
            return next(err);
        }
        if (process.env.PRESERVE_FRAGMENT !== 'false') {
            req.res = res;
        }
        authenticator(req, res, next);
    });
}

function sendUnauthorizedRequest(next, headers) {
    const error = new Error('Authentication required');
    error.status = 401;
    error.headers = headers;
    next(error);
}

function getRealm() {
    const appEnv = vcapUtils.getAppEnv();
    const uris = appEnv.uris;
    const uri = (uris && uris.length > 0) ? uris[0] : '';

    const name = appEnv.application_name || appEnv.name;

    return util.format('%s at %s', name, uri);
}

function staticResourceHandler(req, res, next) {
    const url = req.internalUrl;
    if (!url || !url.route || !url.route.localDir) {
        return next();
    }
    const tracer = req.loggingContext.getTracer(__filename);
    const fullDirName = path.resolve(req.routerConfig.workingDir, url.route.localDir);
    tracer.info('[STATIC] Serving static path:', fullDirName);
    if (_.endsWith(url.pathname, '/')) {
        url.pathname += 'index.html';
    }
    const filePath = path.join(fullDirName, url.pathname);
    fs.realpath(filePath, function (err, resolvedPath) {
        if (err) {
            url.pathname = "index.html";
            resolvedPath = fullDirName;
        }
        if (!_.startsWith(resolvedPath, fullDirName)) {
            return sendError(req, new VError('Path traversal! Requested path: %s', resolvedPath), next, 403);
        }
        const replacements = url.route.replace;
        if (!replacements) {
            return serveStaticContent(fullDirName, req, res, next, url);
        } else {
            const isMatching = replacements.pathSuffixes.some(function (suffix) {
                return _.endsWith(url.pathname, suffix);
            });
            if (isMatching) {
                serveReplacedFile(resolvedPath, req, res, next, replacements.view);
            } else {
                serveStaticContent(fullDirName, req, res, next, url);
            }
        }
    });
}

function serveStaticContent(fullDirName, req, res, next, url) {
    req.url = path.sep + (url.pathname || '');
    serveStatic(fullDirName, {cacheControl: false, fallthrough: false})(req, res, function (err) {
        if (!err) {
            err = new VError('failed to serve %s', req.url);
        }
        sendError(req, err, next, err.status || 404, fullDirName);
    });
}

function serveReplacedFile(filePath, req, res, next, view) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return sendError(req, err, next, 404, filePath);
        }
        let responseData;
        try {
            responseData = mustache.render(data, view);
        } catch (error) {
            return sendError(req, new VError(error, 'error during mustache.render'), next, 500);
        }
        res.setHeader('Content-Type', contentTypeUtil.getContentType(filePath));
        res.end(responseData);
    });
}

function sendError(req, err, next, status, filePath) {
    filePath && req.loggingContext.getTracer(__filename).info('cannot read file: ' + filePath);
    err.status = status;
    next(err);
}

const ar = appRouter();
ar.start();
for (let i = 0; i < ar._app.stack.length; i++) {
    const handlerName = ar._app.stack[i].handle.name;
    if (handlerName === 'staticResourceHandler') {
        ar._app.stack[i].handle = staticResourceHandler;
    } else if (handlerName === 'loginCheck') {
        ar._app.stack[i].handle = loginCheck;
    }
}