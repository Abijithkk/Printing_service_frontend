import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getHero = createAsyncThunk(
  'hero/getHero',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.HERO.GET);
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch hero data',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch hero data';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createHero = createAsyncThunk(
  'hero/createHero',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.HERO.CREATE,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message || 'Failed to create hero');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create hero';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateHero = createAsyncThunk(
  'hero/updateHero',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.HERO.UPDATE.replace(':id', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message || 'Failed to update hero');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update hero';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteHero = createAsyncThunk(
  'hero/deleteHero',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.HERO.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message || 'Failed to delete hero');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete hero';
      return rejectWithValue(errorMessage);
    }
  },
);

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getHero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateHero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteHero.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = heroSlice.actions;
export default heroSlice.reducer;
