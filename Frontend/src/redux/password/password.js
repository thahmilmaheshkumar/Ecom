import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { steps } from "framer-motion";

export const resetPassword = createAsyncThunk(
  "password/resetpassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://ecom-backend-self.vercel.app/api/auth/forgot/password`,
        { email },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went worng...",
      );
    }
  },
);

export const otpVerify = createAsyncThunk(
  "password/otpVerify",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://ecom-backend-self.vercel.app/api/auth/reset/password`,
        {
          token: otp,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went worng...",
      );
    }
  },
);

export const changePassword = createAsyncThunk(
  "password/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://ecom-backend-self.vercel.app/api/auth/password/change`,
        {
          oldPassword,
          newPassword,
        },
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.message || "Something went worng",
      );
    }
  },
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isVerified: false,
    loading: false,
    error: null,
    success: false,
    message: null,
    emailSent: false,
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
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.emailSent = action.payload.success;
      state.success = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(otpVerify.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload?.user));
      localStorage.setItem("isauth", "true");
      state.success = true;
      state.message = action.payload.message;
      state.loading = false;
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { removeError, removeSuccess } = passwordSlice.actions;
export default passwordSlice.reducer;
