import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.CATEGORIES.GET_ALL,
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch categories',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch categories';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CATEGORIES.CREATE,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create category',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create category';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.CATEGORIES.UPDATE.replace(':id', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update category',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update category';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.CATEGORIES.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete category',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete category';
      return rejectWithValue(errorMessage);
    }
  },
);

export const reorderCategories = createAsyncThunk(
  'categories/reorderCategories',
  async (items, { rejectWithValue }) => {
    try {
      const payload = {
        items: items.map((item, index) => ({
          id: item._id,
          order: index + 1,
        })),
      };
      const response = await axiosInstance.put(
        API_ENDPOINTS.CATEGORIES.REORDER,
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
        response.data.message || 'Failed to reorder categories',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to reorder categories';
      return rejectWithValue(errorMessage);
    }
  },
);

export const toggleCategoryStatus = createAsyncThunk(
  'categories/toggleCategoryStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.CATEGORIES.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to toggle category status',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to toggle category status';
      return rejectWithValue(errorMessage);
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
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
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
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
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item._id !== action.payload);
        }
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reorderCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reorderCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        }
        state.error = null;
      })
      .addCase(reorderCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
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
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
