import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const addCartItems = createAsyncThunk(
  "cart/addCartItems",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/product?i=${id}`,
      );
      // console.log(data);
      return {
        product: data?.product?._id,
        name: data?.product?.name,
        image: data?.product?.images[0]?.urls,
        price: data?.product?.price,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Something went worng",
      );
    }
  },
);

export const order = createAsyncThunk(
  "cart/order",
  async ({ products, tax, shipping, total, address }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/create`,
        {
          products,
          taxPrice: tax,
          shippingPrice: shipping,
          paymentMethod: "upi",
          address,
          totalAmount: total,
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
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
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    removeItemCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        const existing = state.cartItems.find(
          (i) => i.product === action.payload.product,
        );

        if (existing) {
          existing.quantity = action.payload?.quantity;
          state.message = `Quantity of ${action.payload.name} updated to cart`;
        } else {
          state.cartItems.push(action.payload);
          state.message = `${action.payload.name} added to cart`;
        }

        state.success = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      })
      .addCase(addCartItems.rejected, (state) => {});

    builder
      .addCase(order.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Order success";
        sessionStorage.removeItem("canCheckout");
        state.cartItems = [];
        localStorage.removeItem("cart");
      })
      .addCase(order.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeError, removeSuccess, clearCart, removeItemCart } =
  cartSlice.actions;
export default cartSlice.reducer;
