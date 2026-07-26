import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/order/myorders`,
        {
          withCredentials: true,
        },
      );
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Something went worng",
      );
    }
  },
);

export const review = createAsyncThunk(
  "order/review",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product/product/review`,
        {
          rating,
          comment,
          productId,
        },
        { withCredentials: true },
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Something went worng",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    success: false,
    error: null,
    message: null,
    loading: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(review.pending, (state) => {
        state.loading = true;
      })
      .addCase(review.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message = "Review added";
      })
      .addCase(review.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { removeError, removeSuccess, clearCart, removeItemCart } =
  orderSlice.actions;
export default orderSlice.reducer;
