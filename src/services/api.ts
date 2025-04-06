
import axios from 'axios';

// Configure the API base URL - replace with your Django backend URL
export const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with common configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (like 401 unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to login or show notification
    }
    return Promise.reject(error);
  }
);

export default api;
