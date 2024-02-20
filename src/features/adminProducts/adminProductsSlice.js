import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminProductsManagementApi from '../../api/adminProductsManagementApi';

export const fetchProducts = createAsyncThunk('adminProducts/fetchProducts', async () => {
  const response = await adminProductsManagementApi.getProducts();
  return response;
});

export const addProduct = createAsyncThunk('adminProducts/addProduct', async (productData) => {
  const response = await adminProductsManagementApi.addProduct(productData);
  return response;
});

export const updateProduct = createAsyncThunk('adminProducts/updateProduct', async ({ productId, productData }) => {
  const response = await adminProductsManagementApi.updateProductById(productId, productData);
  return response;
});

export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct', async (productId) => {
  await adminProductsManagementApi.deleteProductById(productId);
  return productId;
});

export const fetchCategories = createAsyncThunk('adminProducts/fetchCategories', async () => {
  const response = await adminProductsManagementApi.getCategories();
  return response;
});

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    categories: [],
    status: 'idle', 
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

  
});

export default adminProductsSlice.reducer;
