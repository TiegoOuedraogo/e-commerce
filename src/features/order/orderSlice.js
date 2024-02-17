import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../../api/orderApi';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(orderData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.listOrders();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//thunk for getOrderDetails
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderDetails(orderId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const getOrderDetails = createAsyncThunk(
//   'order/getOrderDetails',
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await orderApi.getOrderDetails(orderId);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );



//thunk for updateOrder
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, updateData }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrder(orderId, updateData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.cancelOrder(orderId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Unknown error occurred');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    currentOrder: null,
    status: 'idle',
    error: null
  },

  extraReducers: (builder) => {
    builder
      // .addCase(createOrder.fulfilled, (state, action) => {
      //   state.orders.push(action.payload);
      // })

      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.status = 'succeeded';
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders.splice(index, 1);
          // state.orders[index].status = 'canceled';
        }
        state.status = 'succeeded';
      })
        }
});

export default orderSlice.reducer;


