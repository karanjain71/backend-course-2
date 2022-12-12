import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import PageNotFound from '../components/PageNotFound.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/*',
        name: 'PageNotFound',
        component: PageNotFound,
    },
];

export default routes;