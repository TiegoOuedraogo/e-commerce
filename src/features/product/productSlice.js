import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await productApi.getProducts(filters);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

export const searchProduct = createAsyncThunk(
  'products/searchProduct',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await productApi.searchProduct(searchTerm);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  
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
        state.error = action.error?.message || 'Failed to fetch products';
      })
      .addCase(searchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; 
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;

