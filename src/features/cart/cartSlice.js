import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';

// Async actions
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productDetails, { rejectWithValue }) => {
    try {
      const response = await cartApi.addToCart(productDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartItems();
      return response.cartItems;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await cartApi.updateCartItem(productId, quantity);
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      await cartApi.removeFromCart(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
      return [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
}
// Initial state
const initialState = {
  cartItems: [],
  total: 0,
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    total: 0,
    status: 'idle',
    error: null,
  },


  extraReducers: (builder) => {
    builder
    .addCase(addToCart.fulfilled, (state, action) => {
      // Find the index of the item if it exists
      const existingItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      console.log("the existing items at reducer", existingItemIndex)
      if (existingItemIndex !== -1) {
        // If the item exists, create a new array with the updated item
        const updatedItem = {
          ...state.cartItems[existingItemIndex],
          quantity: state.cartItems[existingItemIndex].quantity + action.payload.quantity,
        };
        console.log("Update items at reducer ", updatedItem)
        // Create a new array with all the previous items
        state.cartItems = [
          ...state.cartItems.slice(0, existingItemIndex),
          updatedItem,
          ...state.cartItems.slice(existingItemIndex + 1),
        ];
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      
      // Recalculate the total price
      state.total = calculateTotal(state.cartItems);
    })
    
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.total = action.payload.reduce((acc, item) => acc + item.quantity * item.price, 0);
        state.status = 'succeeded';
      })
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(item => item._id === action.payload.productId);
        if (index !== -1) {
          state.cartItems[index].quantity = action.payload.quantity;
          state.total = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
          state.status = 'succeeded';
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        state.total = state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        state.status = 'succeeded';
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.total = 0;
      })
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/pending'),
        (state) => { state.status = 'loading'; }
      )
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default cartSlice.reducer;

