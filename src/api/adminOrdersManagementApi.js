import axios from './axios'; 
const API_BASE_URL =  'http://localhost:3000/api/admin';

//https://backend-wstq.onrender.com

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    console.log('Fetched orders:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const addOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

export const updateOrderById = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, orderData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// const fetchCategories = async () => {
//   try {
//       const response = await axios.get(`${API_BASE_URL}/categories`); 
//       return response.data
//   } catch (error) {
//       console.error('Error fetching categories:', error);
//       setError('Failed to fetch categories');
//   }
// };


export default {
  getOrders,
  addOrder,
  updateOrderById,
  deleteOrderById,
//   fetchCategories
};

