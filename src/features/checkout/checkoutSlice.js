import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkoutApi from '../../api/checkOutApi';

export const createOrder = createAsyncThunk(
  'checkout/createOrder',
  async (orderDetails) => {
    const response = await checkoutApi.createOrder(orderDetails);
    return response;
  }
);

const initialState = {
  orderInfo: null,
  status: 'idle',
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default checkoutSlice.reducer;

