const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  HERO: {
    GET: '/admin/hero',
    CREATE: '/admin/hero',
    UPDATE: '/admin/hero/:id',
    DELETE: '/admin/hero/:id',
  },
  SERVICES: {
    GET_ALL: '/admin/services',
    CREATE: '/admin/services',
    UPDATE: '/admin/services/:id',
    DELETE: '/admin/services/:id',
    REORDER: '/admin/services/reorder',
    TOGGLE_ACTIVE: '/admin/services/:id/toggle-active',
  },
  CATEGORIES: {
    GET_ALL: '/admin/categories',
    GET_ONE: '/admin/categories/:id',
    CREATE: '/admin/categories',
    UPDATE: '/admin/categories/:id',
    DELETE: '/admin/categories/:id',
    REORDER: '/admin/categories/reorder',
    TOGGLE_ACTIVE: '/admin/categories/:id/toggle-active',
  },
  TESTIMONIALS: {
    GET_ALL: '/admin/testimonials',
    CREATE: '/admin/testimonials',
    UPDATE: '/admin/testimonials/:id',
    DELETE: '/admin/testimonials/:id',
    TOGGLE_ACTIVE: '/admin/testimonials/:id/toggle-active',
  },
  CTA: {
    GET_ALL: '/admin/header/cta',
    GET_ONE: '/admin/header/cta/:id',
    CREATE: '/admin/header/cta',
    UPDATE: '/admin/header/cta/:id',
    DELETE: '/admin/header/cta/:id',
    TOGGLE_ACTIVE: '/admin/header/cta/:id/toggle-active',
  },
  HIGHLIGHTS: {
    GET_ALL: '/admin/highlights',
    CREATE: '/admin/highlights',
    UPDATE: '/admin/highlights/:id',
    DELETE: '/admin/highlights/:id',
    REORDER: '/admin/highlights/reorder',
    TOGGLE_ACTIVE: '/admin/highlights/:id/toggle-active',
  },
  NAVIGATION: {
    GET_ALL: '/admin/header/navigation',
    CREATE: '/admin/header/navigation',
    UPDATE: '/admin/header/navigation/:id',
    DELETE: '/admin/header/navigation/:id',
    REORDER: '/admin/header/navigation/reorder',
    TOGGLE_ACTIVE: '/admin/header/navigation/:id/toggle-active',
  },
  NEWSLETTER: {
    GET_ALL: '/admin/newsletter',
    SUBSCRIBE: '/public/newsletter',
  },
  SETTINGS: {
    GET: '/admin/site-settings',
    UPDATE_LOGO: '/admin/site-settings/logo',
    UPDATE_CONTACT: '/admin/site-settings/contact',
    UPDATE_FOOTER: '/admin/site-settings/footer',
    ADD_SOCIAL_MEDIA: '/admin/site-settings/social-media',
    UPDATE_SOCIAL_MEDIA: '/admin/site-settings/social-media/:id',
    DELETE_SOCIAL_MEDIA: '/admin/site-settings/social-media/:id',
  },
  HOME: {
    GET: '/public/home',
  },
};

export default API_ENDPOINTS;
