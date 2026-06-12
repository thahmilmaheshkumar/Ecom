import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Register
export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/register", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error.response?.data?.message === "Could not decode base64") {
        return rejectWithValue("Images is too large");
      } else {
        return rejectWithValue(
          error.response?.data?.message ||
            "Registeration failed.Please try again",
        );
      }
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticate: localStorage.getItem("isauth") === "true",
    message: null,
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
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticate = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isauth", JSON.stringify(state.isAuthenticate));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticate = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
