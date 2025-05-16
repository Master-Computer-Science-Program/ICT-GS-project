import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/discounts`;

export const createDiscount = (data) =>
    axios.post(API_URL, data, authHeader());

export const getDiscountById = (discountId) =>
    axios.get(`${API_URL}/${discountId}`, authHeader());

export const updateDiscount = (discountId, data) =>
    axios.put(`${API_URL}/${discountId}`, data, authHeader());

export const deleteDiscount = (discountId) =>
    axios.delete(`${API_URL}/${discountId}`, authHeader());

export const getMyDiscounts = () =>
    axios.get(`${API_URL}/me`, authHeader());