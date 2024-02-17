import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import categoryReducer from '../features/categories/categorySlice';


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    checkout: checkoutReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
console.log('Store updated:', store.getState().cart);

