import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import API_ENDPOINTS from '../../constants/apiEndpoints';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getSiteSettings = createAsyncThunk(
  'settings/getSiteSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SETTINGS.GET);
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to fetch settings',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch settings';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateLogo = createAsyncThunk(
  'settings/updateLogo',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.SETTINGS.UPDATE_LOGO,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.message || 'Failed to update logo');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update logo';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateContact = createAsyncThunk(
  'settings/updateContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.SETTINGS.UPDATE_CONTACT,
        contactData,
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to update contact',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update contact';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateFooter = createAsyncThunk(
  'settings/updateFooter',
  async (footerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.SETTINGS.UPDATE_FOOTER,
        footerData,
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to update footer',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update footer';
      return rejectWithValue(errorMessage);
    }
  },
);

export const addSocialMedia = createAsyncThunk(
  'settings/addSocialMedia',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.SETTINGS.ADD_SOCIAL_MEDIA,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to add social media',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to add social media';
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateSocialMedia = createAsyncThunk(
  'settings/updateSocialMedia',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.SETTINGS.UPDATE_SOCIAL_MEDIA.replace(':id', id),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to update social media',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update social media';
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteSocialMedia = createAsyncThunk(
  'settings/deleteSocialMedia',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.SETTINGS.DELETE_SOCIAL_MEDIA.replace(':id', id),
      );
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(
        response.data.message || 'Failed to delete social media',
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete social media';
      return rejectWithValue(errorMessage);
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSiteSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSiteSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getSiteSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateFooter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFooter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateFooter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSocialMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSocialMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
