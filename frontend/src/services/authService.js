import axios from 'axios';
import { BACKEND_HOST } from '../config';

const API_URL = `${BACKEND_HOST}/auth`;

export const login = async (formData) => {
    const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }});
    return response.data;
};

export const signup = async (params) => {
    const response = await axios.post(`${API_URL}/register`, { ...params });
    return response.data;
};
