import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let api = "/api/product/products?page=" + page;
      if (category) {
        api += `&filter=${category}`;
      }
      if (keyword) {
        api += `&k=${keyword}`;
      }

      const link = api;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong...",
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
        error.response?.data?.message || "Something went wrong...",
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
    totalPages: 0,
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
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = true;
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
