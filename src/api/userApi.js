import axios from './axios'; 

const API_URL = import.meta.env.VITE_APP_API_URL || 'https://backend-72yx.onrender.com';

const userApi = {
  register: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  login: async (credentials) => {
    try {
      // console.log('line 17 from user api')
      const response = await axios.post(`${API_URL}/api/users/login`, credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.userRole); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  logout: () => {
    localStorage.removeItem('authToken'); 
  }
};

export default userApi;

