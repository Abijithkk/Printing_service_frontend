import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getSubscribers = createAsyncThunk(
  'newsletter/getSubscribers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.NEWSLETTER.GET_ALL);

      if (response.data?.success) {
        return response.data.data || [];
      }

      return rejectWithValue(
        response.data?.message || 'Failed to fetch newsletter subscribers',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch newsletter subscribers';

      return rejectWithValue(errorMessage);
    }
  },
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getSubscribers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = newsletterSlice.actions;
export default newsletterSlice.reducer;
