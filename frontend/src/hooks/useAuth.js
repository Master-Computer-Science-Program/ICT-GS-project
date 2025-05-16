import { login, signup } from '../services/authService';

export const useAuth = () => {
    const loginUser = async (formData) => {
        const data = await login(formData);
        const accessToken = data.access_token;
        localStorage.setItem('token', 'bearer ' + accessToken);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('username', data.user.name);
        // localStorage.setItem('user_id', data.user.id);

        if (data.user.role === 'admin') {
            window.location.href = '/admin/dashboard';
        }
        if (data.user.role === 'farmer') {
            window.location.href = '/farmer/products';
        }
        if (data.user.role === 'customer') {
            window.location.href = '/customer/catalog';
        }
        if (data.user.role === 'service_provider') {
            window.location.href = '/provider/storages';
        }
    };

    const signupUser = async (params) => {
        // console.log('Signup params:', params);
        const data = await signup(params);
        // console.log('Signup successful:', data);
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        // localStorage.removeItem('user_id');
        window.location.href = '/login';
    };

    return {
        login: loginUser,
        signup: signupUser,
        logout: logoutUser,
    };
};
