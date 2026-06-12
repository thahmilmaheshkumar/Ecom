import { configureStore } from "@reduxjs/toolkit";
import produceReducer from "../redux/products/productSlice";
import userReducer from "../redux/user/userslice";

export const store = configureStore({
  reducer: {
    product: produceReducer,
    user: userReducer,
  },
});
