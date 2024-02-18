import axios from './axios'; 

export const getProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    // console.log('Fetched products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default {
  getProducts
};
