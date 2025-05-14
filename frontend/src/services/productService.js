import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/products`;

export const getProducts = (params) =>
    axios.get(API_URL, { ...authHeader(), params });

export const getProduct = (id) =>
    axios.get(`${API_URL}/${id}`, authHeader());

export const createProduct = (params) =>
    axios.post(API_URL, params, authHeader());

export const updateProduct = (id, params) =>
    axios.put(`${API_URL}/${id}`, params, authHeader());

export const deleteProduct = (id) =>
    axios.delete(`${API_URL}/${id}`, authHeader());
