import axios from './axios'; 

export const getProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const fetchFilteredProducts = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`/api/products/filter?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error;
  }
};

fetch('/api/products/filter?rating=4.5')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching products:', error));

export default {
  getProducts,
  fetchFilteredProducts
};

