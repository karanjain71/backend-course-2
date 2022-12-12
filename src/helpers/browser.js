export function isLocalHost() {
    const url = window.location.href.split("/")[2].split(":")[0]
    if(url === "localhost" || url === "127.0.0.1"){
      return true
    }
    else {
      return false
    }
  }

  export const downloadFile = (url, errorCallback) => {
    if (window.Blob && url instanceof window.Blob) {
        url = (window.URL || window.webkitURL).createObjectURL(url);
    }
    const hiddenIFrameID = 'hiddenDownloader';
    let iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        iframe.onerror = function() {
            if (errorCallback) {
                errorCallback();
            }
        };
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};

export const saveFile = (
    data,
    filename,
    ext,
    mimeType,
    charset,
    byteOrderMark
) => {
    const fullFilename = filename + '.' + ext;
    if (
        typeof byteOrderMark === 'undefined' &&
        charset === 'utf-8' &&
        ext === 'csv'
    ) {
        byteOrderMark = true;
    }
    if (byteOrderMark === true && charset === 'utf-8') {
        data = '\ufeff' + data;
    }
    if (window.Blob) {
        let type = 'data:' + mimeType;
        if (charset) {
            type += ';charset=' + charset;
        }
        const blob = new window.Blob([data], { type: type });
        const saveBlobFunc =
            window.navigator.msSaveOrOpenBlob || window.navigator.msSaveBlob;
        if (saveBlobFunc) {
            saveBlobFunc(blob, fullFilename);
        } else {
            let link = window.document.createElement('a');
            if ('download' in link) {
                link.setAttribute(
                    'href',
                    (window.URL || window.webkitURL).createObjectURL(blob)
                );
                link.setAttribute('download', fullFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                data = encodeURI(data);
                const isOpened = window.open(type + ',' + data);
                if (!isOpened) {
                    throw new Error(
                        'Could not download the file, please deactivate your pop-up blocker.'
                    );
                }
            }
        }
    }
};

