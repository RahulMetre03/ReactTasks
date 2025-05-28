import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to get token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in.');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};

// Public endpoints (no authentication required)
export const getStudentsData = async () => {
    const { data } = await axios.get(`${API_URL}/student`);
    return data;
};

export const getTeacherData = async () => {
    const { data } = await axios.get(`${API_URL}/teacher`);
    return data;
};

export const checkLogin = async (username, password) => {
    const { data } = await axios.post(`${API_URL}/login`, { username, password });
    return data;
};

// Protected endpoints (authentication required)
export const getProtectedData = async () => {
    const { data } = await axios.get(`${API_URL}/protected`, {
        headers: getAuthHeaders(),
    });
    return data;
};

export const getMyTeacherData = async () => {
    const { data } = await axios.get(`${API_URL}/myteacherdata`, {
        headers: getAuthHeaders(),
    });
    return data;
};

export const getMyStudentData = async () => {
    const { data } = await axios.get(`${API_URL}/mystudentdata`, {
        headers: getAuthHeaders(),
    });
    return data;
};

// Utility functions for token management
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};