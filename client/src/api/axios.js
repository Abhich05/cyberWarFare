import axios from 'axios';

// Production API URL
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://cyberwarfare.onrender.com/api' : '/api');

// Token key for localStorage
const TOKEN_KEY = 'authToken';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Still try cookies
  timeout: 15000,
});

// Request interceptor - Add Authorization header
api.interceptors.request.use(
  (config) => {
    // Add token from localStorage as Authorization header (fallback for cross-origin)
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = 
      error.response?.data?.message || 
      error.message || 
      'Something went wrong';

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear any local auth state
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
