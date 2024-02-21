import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'https://backend-72yx.onrender.com/'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    window.location = '/login';
  }
  return Promise.reject(error);
});

export default axiosInstance;

