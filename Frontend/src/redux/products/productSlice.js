import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const link = "/api/product/products";
      const { data } = await axios.get(link);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Something went wrong...",
      );
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/product/product/?i=${id}`;
      const { data } = await axios.get(link);
      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || "Something went wrong...",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    productCount: 0,
    loading: false,
    error: null,
    productDetails: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.productCount = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong...";
      });

    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong...";
      });
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
