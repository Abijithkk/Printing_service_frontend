import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getTestimonials = createAsyncThunk(
  'testimonials/getTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TESTIMONIALS.GET_ALL,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch testimonials',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch testimonials';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createTestimonial = createAsyncThunk(
  'testimonials/createTestimonial',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.TESTIMONIALS.CREATE,
        payload,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create testimonial',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create testimonial';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/updateTestimonial',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.TESTIMONIALS.UPDATE.replace(':id', id),
        payload,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update testimonial',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update testimonial';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.TESTIMONIALS.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete testimonial',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete testimonial';
      return rejectWithValue(errorMessage);
    }
  },
);

export const toggleTestimonialStatus = createAsyncThunk(
  'testimonials/toggleTestimonialStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.TESTIMONIALS.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to toggle testimonial status',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to toggle testimonial status';
      return rejectWithValue(errorMessage);
    }
  },
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createTestimonial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (action.payload && action.payload._id) {
          if (Array.isArray(state.data)) {
            state.data = [...state.data, action.payload];
          } else {
            state.data = [action.payload];
          }
        }
        state.error = null;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTestimonial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
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
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTestimonial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item._id !== action.payload);
        }
        state.error = null;
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleTestimonialStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleTestimonialStatus.fulfilled, (state, action) => {
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
      .addCase(toggleTestimonialStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
