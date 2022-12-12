import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import PageNotFound from '../components/PageNotFound.vue';

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
        path: '/*',
        name: 'PageNotFound',
        component: PageNotFound,
    },
];

export default routes;