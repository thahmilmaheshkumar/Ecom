import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Register
export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://ecom-backend-self.vercel.app/api/auth/register",
        user,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        },
      );
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

//Login
export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://ecom-backend-self.vercel.app/api/auth/login`,
        user,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registeration failed.Please try again",
      );
    }
  },
);

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://ecom-backend-self.vercel.app/api/auth/logout`,
        {
          withCredentials: true,
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registeration failed.Please try again",
      );
    }
  },
);

//edit profile
export const editProfile = createAsyncThunk(
  "user/editprofile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://ecom-backend-self.vercel.app/api/auth/update/profile`,
        profileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Profile update failed.Please try again",
      );
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

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticate = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isauth", JSON.stringify(state.isAuthenticate));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticate = false;
        state.user = null;
        state.error = action.payload;
        localStorage.removeItem("user");
        localStorage.removeItem("isauth");
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticate = false;
        state.user = null;
        state.success = action.payload.success;
        localStorage.removeItem("user");
        localStorage.removeItem("isauth");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.update;
        state.success = action.payload.success;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isauth", JSON.stringify(state.isAuthenticate));
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
