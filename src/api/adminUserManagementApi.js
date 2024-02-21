import axios from './axios'; 
const API_BASE_URL =  'https://backend-72yx.onrender.com/api/admin';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log('Fetched users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


export const addUser = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${userId}`, userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    console.log("line 37 response data",response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export default {
  getUsers,
  addUser,
  updateUserById,
  deleteUserById
};

