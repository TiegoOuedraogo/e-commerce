// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import productApi from '../../api/productApi';

// export const fetchProducts = createAsyncThunk(
//   'product/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await productApi.getProducts();
//       return response;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const initialState = {
//   products: [],
//   status: 'idle', 
//   error: null
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default productSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

// Update the fetchProducts thunk to accept filters argument
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      // Pass filters to the API call
      const response = await productApi.getProducts(filters);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
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
      });
  },
});

export default productSlice.reducer;

