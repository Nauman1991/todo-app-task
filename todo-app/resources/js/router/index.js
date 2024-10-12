import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        next('/login');
    } else {
        next();
    }
});

export default router;
