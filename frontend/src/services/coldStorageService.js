import axios from 'axios';
import { BACKEND_HOST } from '../config';
import { authHeader } from '../utils/auth';

const API_URL = `${BACKEND_HOST}/cold-storage`;

// Get all cold storages (public)
export const getAllColdStorages = (params) =>
    axios.get(API_URL, { ...authHeader(), params });

// Get cold storage by ID
export const getColdStorageById = (storageId) =>
    axios.get(`${API_URL}/${storageId}`, authHeader());

// Create new cold storage (Provider only)
export const createColdStorage = (data) =>
    axios.post(API_URL, data, authHeader());

// Update cold storage by ID (Provider & owner only)
export const updateColdStorage = (storageId, data) =>
    axios.put(`${API_URL}/${storageId}`, data, authHeader());

// Delete cold storage by ID (Provider & owner only)
export const deleteColdStorage = (storageId) =>
    axios.delete(`${API_URL}/${storageId}`, authHeader());

// Get cold storages by current logged-in provider
export const getMyColdStorages = () =>
    axios.get(`${API_URL}/provider/me`, authHeader());
