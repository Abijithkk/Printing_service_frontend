import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNavigationItems: (state, action) => {
      state.items = action.payload;
      state.error = null;
    },
    addNavigationItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateNavigationItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteNavigationItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    reorderNavigationItems: (state, action) => {
      state.items = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setNavigationItems,
  addNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  reorderNavigationItems,
  clearError,
} = navigationSlice.actions;

export default navigationSlice.reducer;
