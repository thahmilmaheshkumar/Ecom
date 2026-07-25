import { configureStore } from "@reduxjs/toolkit";
import produceReducer from "../redux/products/productSlice";
import userReducer from "../redux/user/userslice";
import passwordReducer from "../redux/password/password";
import createReducer from "../redux/cart/cartSlice";
import orderSlice from "../redux/order/order";

export const store = configureStore({
  reducer: {
    product: produceReducer,
    user: userReducer,
    password: passwordReducer,
    cart: createReducer,
    order: orderSlice,
  },
});
