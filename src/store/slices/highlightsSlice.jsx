import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getHighlights = createAsyncThunk(
  'highlights/getHighlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.HIGHLIGHTS.GET_ALL);
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch highlights',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch highlights';
      return rejectWithValue(errorMessage);
    }
  },
);

export const createHighlight = createAsyncThunk(
  'highlights/createHighlight',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.HIGHLIGHTS.CREATE,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to create highlight',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create highlight';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateHighlight = createAsyncThunk(
  'highlights/updateHighlight',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.HIGHLIGHTS.UPDATE.replace(':id', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to update highlight',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update highlight';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteHighlight = createAsyncThunk(
  'highlights/deleteHighlight',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.HIGHLIGHTS.DELETE.replace(':id', id),
      );
      if (response.data.success) {
        return id;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete highlight',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete highlight';
      return rejectWithValue(errorMessage);
    }
  },
);

export const reorderHighlights = createAsyncThunk(
  'highlights/reorderHighlights',
  async (items, { rejectWithValue }) => {
    try {
      const payload = items.map((item, index) => ({
        id: item._id,
        order: index + 1,
      }));
      const response = await axiosInstance.put(
        API_ENDPOINTS.HIGHLIGHTS.REORDER,
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
        response.data.message || 'Failed to reorder highlights',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to reorder highlights';
      return rejectWithValue(errorMessage);
    }
  },
);

export const toggleHighlightStatus = createAsyncThunk(
  'highlights/toggleHighlightStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        API_ENDPOINTS.HIGHLIGHTS.TOGGLE_ACTIVE.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data || [];
      }
      return rejectWithValue(
        response.data.message || 'Failed to toggle highlight status',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to toggle highlight status';
      return rejectWithValue(errorMessage);
    }
  },
);

const highlightsSlice = createSlice({
  name: 'highlights',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHighlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHighlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getHighlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createHighlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHighlight.fulfilled, (state, action) => {
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
      .addCase(createHighlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateHighlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHighlight.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (action.payload && action.payload._id && Array.isArray(state.data)) {
          state.data = state.data.map((item) =>
            item._id === action.payload._id ? action.payload : item,
          );
        }
        state.error = null;
      })
      .addCase(updateHighlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteHighlight.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHighlight.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((item) => item._id !== action.payload);
        }
        state.error = null;
      })
      .addCase(deleteHighlight.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reorderHighlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reorderHighlights.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        }
        state.error = null;
      })
      .addCase(reorderHighlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleHighlightStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleHighlightStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else if (action.payload && action.payload._id && Array.isArray(state.data)) {
          state.data = state.data.map((item) =>
            item._id === action.payload._id ? action.payload : item,
          );
        }
        state.error = null;
      })
      .addCase(toggleHighlightStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = highlightsSlice.actions;
export default highlightsSlice.reducer;
