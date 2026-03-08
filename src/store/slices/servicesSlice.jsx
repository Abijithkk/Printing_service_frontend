import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getServices = createAsyncThunk(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.SERVICES.GET_ALL,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch services',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch services';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createService = createAsyncThunk(
  'services/createService',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.SERVICES.CREATE,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create service',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create service';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.SERVICES.UPDATE.replace(':id', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update service',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update service';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.SERVICES.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete service',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete service';
      return rejectWithValue(errorMessage);
    }
  },
);

export const reorderServices = createAsyncThunk(
  'services/reorderServices',
  async (items, { rejectWithValue }) => {
    try {
      const payload = {
        items: items.map((item, index) => ({
          id: item._id,
          order: index + 1,
        })),
      };
      const response = await axiosInstance.put(
        API_ENDPOINTS.SERVICES.REORDER,
        payload,
      );
      if (response.data.success) {
        const serverData = response.data.data;
        if (Array.isArray(serverData)) {
          return serverData;
        }
        return items.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      }
      return rejectWithValue(
        response.data.message || 'Failed to reorder services',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to reorder services';
      return rejectWithValue(errorMessage);
    }
  },
);

export const toggleServiceStatus = createAsyncThunk(
  'services/toggleServiceStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.SERVICES.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to toggle service status',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to toggle service status';
      return rejectWithValue(errorMessage);
    }
  },
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
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
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
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
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item._id !== action.payload);
        }
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reorderServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reorderServices.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        }
        state.error = null;
      })
      .addCase(reorderServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleServiceStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleServiceStatus.fulfilled, (state, action) => {
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
      .addCase(toggleServiceStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = servicesSlice.actions;
export default servicesSlice.reducer;
