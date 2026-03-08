import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      );

      if (response.data.success) {
        const { data } = response.data;
        const token = data.token;

        localStorage.setItem('authToken', token);
        localStorage.setItem('adminUser', JSON.stringify(data));

        return {
          user: data,
          token: token,
        };
      }

      return rejectWithValue(response.data.message || 'Login failed');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminUser');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('adminUser');

      if (token && user) {
        try {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminUser');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { initializeAuth } = authSlice.actions;
export default authSlice.reducer;
