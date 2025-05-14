import { login, signup } from '../services/authService';

export const useAuth = () => {
    const loginUser = async (formData) => {
        const data = await login(formData);
        const accessToken = data.access_token;
        localStorage.setItem('token', 'bearer ' + accessToken);
        localStorage.setItem('role', data.user.role);

        if (data.user.role === 'admin') {
            window.location.href = '/admin/dashboard';
        }
        if (data.user.role === 'farmer') {
            window.location.href = '/farmer/products';
        }
        if (data.user.role === 'customer') {
            window.location.href = '/customer/catalog';
        }
        if (data.user.role === 'provider') {
            window.location.href = '/provider/storages';
        }
    };

    const signupUser = async (params) => {
        const data = await signup(params);
    };

    return {
        login: loginUser,
        signup: signupUser,
    };
};