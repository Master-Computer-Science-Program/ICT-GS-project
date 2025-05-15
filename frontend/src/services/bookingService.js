import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/bookings`;

export const getMyBookings = (params) =>
    axios.get(`${API_URL}/farmer/me`, { ...authHeader(), params });

export const getProviderBookings = (params) =>
    axios.get(`${API_URL}/provider/me`, { ...authHeader(), params });

export const createBooking = (data) =>
    axios.post(API_URL, data, authHeader());

export const updateBooking = (bookingId, data) =>
    axios.put(`${API_URL}/${bookingId}`, data, authHeader());

export const deleteBooking = (bookingId) =>
    axios.delete(`${API_URL}/${bookingId}`, authHeader());

export const getBookingById = (bookingId) =>
    axios.get(`${API_URL}/${bookingId}`, authHeader());

export const getMyProviderBookings = (params) =>
    axios.get(`${API_URL}/provider/me`, { ...authHeader(), params });
