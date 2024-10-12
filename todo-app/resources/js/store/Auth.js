import { ref } from 'vue';
import axios from 'axios';
import { showSuccess, showError } from '../Utils/toastr';

export function useAuth() {
    const user = ref(null);
    const isAuthenticated = ref(false);

    const setAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const handleAuthResponse = (response) => {
        const token = response.data.token || response.data.access_token;
        localStorage.setItem('token', token);
        setAuthHeader(token);
        user.value = response.data.user;
        isAuthenticated.value = true;
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            handleAuthResponse(response);
            showSuccess('Logged in successfully');
            return response.data;
        } catch (error) {
            console.error(error);
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        showError('User not found');
                        throw new Error('User not found');
                    case 422:
                        showError('Invalid credentials');
                        throw error.response.data.errors;
                    default:
                        showError('An unexpected error occurred');
                        throw new Error('An unexpected error occurred');
                }
            } else {
                showError('An unexpected error occurred');
                throw new Error('An unexpected error occurred');
            }
        }
    };

    const signup = async (name, email, password, password_confirmation) => {
        try {
            const response = await axios.post('/api/register', { name, email, password, password_confirmation });
            handleAuthResponse(response);
            showSuccess('Signed up successfully');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 422) {
                showError(error.response.data.message || 'Invalid input');
                throw error.response.data.errors;
            }
            showError('An unexpected error occurred');
            throw new Error('An unexpected error occurred');
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('token');
            setAuthHeader(null);
            user.value = null;
            isAuthenticated.value = false;
            showSuccess('Logged out successfully');
        } catch (error) {
            showError('Logout failed');
            console.error('Logout failed:', error);
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                setAuthHeader(token);
                const response = await axios.get('/api/user');
                user.value = response.data;
                isAuthenticated.value = true;
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setAuthHeader(null);
                user.value = null;
                isAuthenticated.value = false;
            }
        }
    };

    return { user, isAuthenticated, login, signup, logout, checkAuth };
}