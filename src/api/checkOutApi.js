import axios from './axios';

const checkoutApi = {
  createOrder: async (orderDetails) => {
    try {
      const response = await axios.post('/api/orders/checkout', orderDetails);
      console.log('Order created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during checkout:', error.response?.data || error);
      throw error;
    }
  },
  getOrders: async () => {
    try {
      const response = await axios.get('/api/orders');
      console.log('Orders fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error);
      throw error;
    }
  },
  updateOrder: async (orderId, updateDetails) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, updateDetails);
      console.log('Order updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error.response?.data || error);
      throw error;
    }
  },
  cancelOrder: async (orderId) => {
    try {
      const response = await axios.delete(`/api/orders/${orderId}`);
      console.log('Order cancelled:', orderId);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error.response?.data || error);
      throw error;
    }
  }
};

export default checkoutApi;

