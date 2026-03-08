import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getHomeData = createAsyncThunk(
  'home/getHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.HOME.GET);
      if (response.data.success) {
        return response.data.data || null;
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch home data',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch home data';
      return rejectWithValue(errorMessage);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = homeSlice.actions;
export default homeSlice.reducer;
