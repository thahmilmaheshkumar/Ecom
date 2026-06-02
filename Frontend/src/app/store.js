import { configureStore } from "@reduxjs/toolkit";
import produceReducer from "../redux/products/productSlice";

export const store = configureStore({
  reducer: {
    product: produceReducer,
  },
});
