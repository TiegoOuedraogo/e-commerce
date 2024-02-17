import axios from './axios';

export const categoryApi = {
  fetchCategories: async () => {
    try {
      const response = await axios.get('/api/admin/categories', {
        headers: {
          Authorization: `Bearer ${userToken}`, 
        },
      });
      console.log('Categories fetched successfully:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  fetchCategoryById: async (id, userToken) => {
    try {
      const response = await axios.get(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log("Response for getting category by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting category by ID:', error);
      throw error;
    }  
  },
  createCategory: async (categoryData, userToken) => {
    try {
      const response = await axios.post('/api/categories/', categoryData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log('Category created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },
  updateCategoryById: async (id, updateData, userToken) => {
    try {
      const response = await axios.put(`/api/categories/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log('Category updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },
  deleteCategoryById: async (id, userToken) => {
    try {
      const response = await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log('Category deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};

