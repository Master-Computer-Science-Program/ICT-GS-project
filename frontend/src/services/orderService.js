import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/orders`;

// Get all orders for current customer
export const getCustomerOrders = () =>
    axios.get(API_URL, authHeader());

// Get order by ID (Customer only)
export const getOrderById = (orderId) =>
    axios.get(`${API_URL}/${orderId}`, authHeader());

// Create new order (Customer only)
export const createOrder = (data) =>
    axios.post(API_URL, data, authHeader());

// Make payment for an order (Customer only)
export const makePayment = (orderId) =>
    axios.post(`${API_URL}/${orderId}/payment`, {}, authHeader());

// Confirm order receipt (Customer only)
export const confirmReceipt = (orderId) =>
    axios.post(`${API_URL}/${orderId}/confirm-receipt`, {}, authHeader());

// Get all orders for current farmer
export const getFarmerOrders = () =>
    axios.get(`${API_URL}/farmer/me`, authHeader());
