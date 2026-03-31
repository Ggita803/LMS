import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  // Do NOT set Content-Type globally; let Axios/browser set it per request
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem('authToken');
      Cookies.remove('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
