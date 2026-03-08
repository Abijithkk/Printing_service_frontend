import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import heroReducer from './slices/heroSlice';
import servicesReducer from './slices/servicesSlice';
import categoriesReducer from './slices/categoriesSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import ctaReducer from './slices/ctaSlice';
import highlightsReducer from './slices/highlightsSlice';
import navigationReducer from './slices/navigationSlice';
import newsletterReducer from './slices/newsletterSlice';
import settingsReducer from './slices/settingsSlice';
import homeReducer from './slices/homeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    hero: heroReducer,
    services: servicesReducer,
    categories: categoriesReducer,
    testimonials: testimonialsReducer,
    cta: ctaReducer,
    highlights: highlightsReducer,
    navigation: navigationReducer,
    newsletter: newsletterReducer,
    settings: settingsReducer,
    home: homeReducer,
  },
});

export default store;
