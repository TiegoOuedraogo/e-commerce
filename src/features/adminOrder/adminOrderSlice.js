import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminOrdersManagementApi from '../../api/adminOrdersManagementApi';


export const fetchOrders = createAsyncThunk('adminOrder/fetchOrders', async () => {
  const response = await adminOrdersManagementApi.getOrders();
  return response;
});

export const addOrder = createAsyncThunk('adminOrder/addOrder', async (orderData) => {
  const response = await adminOrdersManagementApi.addOrder(orderData);
  return response;
});

export const updateOrder = createAsyncThunk('adminOrder/updateOrder', async ({ orderId, orderData }) => {
  const response = await adminOrdersManagementApi.updateOrderById(orderId, orderData);
  return response;
});

export const deleteOrder = createAsyncThunk('adminOrder/deleteOrder', async (orderId) => {
  await adminOrdersManagementApi.deleteOrderById(orderId);
  return orderId;
});

// export const fetchCategories = createAsyncThunk('adminOrder/fetchCategories', async () => {
//   const response = await adminOrdersManagementApi.getCategories();
//   return response;
// });

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState: {
    orders: [],
    // categories: [],
    status: 'idle', 
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },

  
});

export default adminOrderSlice.reducer;
