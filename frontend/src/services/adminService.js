import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/admin-monitor`;

export const getRecentBookings = (params) =>
    axios.get(`${API_URL}/bookings`, { ...authHeader(), params });

export const getRecentOrders = (params) =>
    axios.get(`${API_URL}/orders`, { ...authHeader(), params });

export const getUsers = (params) =>
    axios.get(`${API_URL}/users`, { ...authHeader(), params });

export const deleteUser = (userId) =>
    axios.delete(`${API_URL}/users/${userId}`, authHeader());
