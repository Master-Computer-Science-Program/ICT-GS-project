import { login, signup } from '../services/authService';

export const useAuth = () => {

    const loginUser = async (formData) => {
        const data = await login(formData);
        const accessToken = data.access_token;
        localStorage.setItem('token', 'bearer ' + accessToken);
    };

    const signupUser = async (params) => {
        const data = await signup(params);
    };

    return {
        login: loginUser,
        signup: signupUser,
    };
};