import axios from './axios'; 

const orderApi = {
  createOrder: async (orderData) => {
    //console.log('sending order')
    try {
      const response = await axios.post('/orders', orderData);
      console.log("response to the order ",response.data)
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  listOrders: async () => {
    try {
      const response = await axios.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
getOrderDetails: async (orderId) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
},

  updateOrder: async (orderId, updateData) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/status`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await axios.delete(`/api/orders/cancel/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

};

export default orderApi;

