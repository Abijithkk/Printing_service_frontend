import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getCtas = createAsyncThunk(
  'cta/getCtas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CTA.GET_ALL);
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch CTA buttons',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch CTA buttons';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createCta = createAsyncThunk(
  'cta/createCta',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CTA.CREATE,
        payload,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create CTA button',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create CTA button';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateCta = createAsyncThunk(
  'cta/updateCta',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.CTA.UPDATE.replace(':id', id),
        payload,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update CTA button',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update CTA button';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteCta = createAsyncThunk(
  'cta/deleteCta',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.CTA.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete CTA button',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete CTA button';
      return rejectWithValue(errorMessage);
    }
  },
);

export const toggleCtaStatus = createAsyncThunk(
  'cta/toggleCtaStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.CTA.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update CTA button status',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update CTA button status';
      return rejectWithValue(errorMessage);
    }
  },
);

const ctaSlice = createSlice({
  name: 'cta',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCtas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCtas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCtas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCta.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (action.payload && action.payload._id) {
          if (Array.isArray(state.data)) {
            state.data = [action.payload, ...state.data];
          } else {
            state.data = [action.payload];
          }
        }
        state.error = null;
      })
      .addCase(createCta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCta.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (
          action.payload &&
          action.payload._id &&
          Array.isArray(state.data)
        ) {
          state.data = state.data.map((item) =>
            item._id === action.payload._id ? action.payload : item,
          );
        }
        state.error = null;
      })
      .addCase(updateCta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCta.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCta.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item._id !== action.payload);
        }
        state.error = null;
      })
      .addCase(deleteCta.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleCtaStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleCtaStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (
          action.payload &&
          action.payload._id &&
          Array.isArray(state.data)
        ) {
          state.data = state.data.map((item) =>
            item._id === action.payload._id ? action.payload : item,
          );
        }
        state.error = null;
      })
      .addCase(toggleCtaStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ctaSlice.actions;
export default ctaSlice.reducer;
