import axios from './axios'; 

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

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
      console.log('line 17 from user api')
      const response = await axios.post(`${API_URL}/api/users/login`, credentials);
      localStorage.setItem('authToken', response.data.token); 
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



// import axios from 'axios';

// const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

// // Create an axios instance for configuring base settings
// const apiClient = axios.create({
//   baseURL: API_URL,
// });

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// apiClient.interceptors.response.use(response => response, async (error) => {
//   if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     try {
//       const rs = await refreshToken();
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + rs.token;
//       return apiClient(originalRequest);
//     } catch (_error) {
//       return Promise.reject(_error);
//     }
//   }
//   return Promise.reject(error);
// });

// const userApi = {
//   register: async (credentials) => {
//     try {
//       const response = await apiClient.post('/api/users/register', credentials);
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//         // Set token for all subsequent requests
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//       }
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data.message || "An error occurred during registration.");
//     }
//   },
//   login: async (credentials) => {
//     try {
//       const response = await apiClient.post('/api/users/login', credentials);
//       localStorage.setItem('authToken', response.data.token); 
//       // Set the token as a default header for subsequent requests
//       apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data.message || "Failed to log in. Please check your credentials.");
//     }
//   },
//   logout: () => {
//     localStorage.removeItem('authToken'); 
//     delete apiClient.defaults.headers.common['Authorization'];
//   }
// };

// export default userApi;
