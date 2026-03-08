import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const normalize = (item) => ({
  ...item,
  id: item._id || item.id,
});

export const getNavigation = createAsyncThunk(
  'navigation/getNavigation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.NAVIGATION.GET_ALL,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch navigation items',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch navigation items';
      return rejectWithValue(message);
    }
  },
);

export const createNavigation = createAsyncThunk(
  'navigation/createNavigation',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.NAVIGATION.CREATE,
        formData,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create navigation item',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to create navigation item';
      return rejectWithValue(message);
    }
  },
);

export const updateNavigation = createAsyncThunk(
  'navigation/updateNavigation',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.NAVIGATION.UPDATE.replace(':id', id),
        formData,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update navigation item',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to update navigation item';
      return rejectWithValue(message);
    }
  },
);

export const deleteNavigation = createAsyncThunk(
  'navigation/deleteNavigation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.NAVIGATION.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete navigation item',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete navigation item';
      return rejectWithValue(message);
    }
  },
);

export const reorderNavigation = createAsyncThunk(
  'navigation/reorderNavigation',
  async (items, { rejectWithValue }) => {
    try {
      const payload = items.map((item, index) => ({
        id: item._id || item.id,
        order: index + 1,
      }));
      const response = await axiosInstance.put(
        API_ENDPOINTS.NAVIGATION.REORDER,
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
        response.data.message || 'Failed to reorder navigation items',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to reorder navigation items';
      return rejectWithValue(message);
    }
  },
);

export const toggleNavigationStatus = createAsyncThunk(
  'navigation/toggleNavigationStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.NAVIGATION.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to toggle navigation status',
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to toggle navigation status';
      return rejectWithValue(message);
    }
  },
);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNavigation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNavigation.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload.map(normalize);
        } else {
          state.data = [];
        }
      })
      .addCase(getNavigation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createNavigation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNavigation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(normalize(action.payload));
      })
      .addCase(createNavigation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateNavigation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNavigation.fulfilled, (state, action) => {
        state.isLoading = false;
        const normalized = normalize(action.payload);
        const index = state.data.findIndex((item) => item.id === normalized.id);
        if (index !== -1) {
          state.data[index] = normalized;
        }
      })
      .addCase(updateNavigation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteNavigation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNavigation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteNavigation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(reorderNavigation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reorderNavigation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(reorderNavigation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(toggleNavigationStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleNavigationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const normalized = normalize(action.payload);
        const index = state.data.findIndex((item) => item.id === normalized.id);
        if (index !== -1) {
          state.data[index] = normalized;
        }
      })
      .addCase(toggleNavigationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = navigationSlice.actions;
export default navigationSlice.reducer;
