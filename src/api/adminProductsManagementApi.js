import axios from './axios'; 
const API_BASE_URL =  'http://localhost:3000/api/admin';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    // console.log('Fetched products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductById = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductById = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


export default {
  getProducts,
  addProduct,
  updateProductById,
  deleteProductById,
};
