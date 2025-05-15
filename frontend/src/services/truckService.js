import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/trucks`;

// Get all trucks (public)
export const getAllTrucks = (params) =>
    axios.get(API_URL, { ...authHeader(), params });

// Get truck by ID
export const getTruckById = (truckId) =>
    axios.get(`${API_URL}/${truckId}`, authHeader());

// Create new truck (Provider only)
export const createTruck = (data) =>
    axios.post(API_URL, data, authHeader());

// Update truck by ID (Provider & owner only)
export const updateTruck = (truckId, data) =>
    axios.put(`${API_URL}/${truckId}`, data, authHeader());

// Delete truck by ID (Provider & owner only)
export const deleteTruck = (truckId) =>
    axios.delete(`${API_URL}/${truckId}`, authHeader());

// Get trucks by current logged-in provider
export const getMyTrucks = () =>
    axios.get(`${API_URL}/provider/me`, authHeader());
