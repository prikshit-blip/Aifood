// API Endpoints
// Centralized endpoint definitions for easy maintenance

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    SIGN_OUT: '/auth/signout',
    REFRESH_TOKEN: '/auth/refresh',
    GET_CURRENT_USER: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Tenant & Theme
  THEME: {
    GET_THEME: (domain: string) => `/cp/api/theme?domain=${domain}`,
  },
  TENANT: {
    GET_TENANT_INFO: '/tenant/info',
    GET_TENANT_THEME: '/tenant/theme',
    UPDATE_TENANT_THEME: '/tenant/theme',
  },

  // Orders
  ORDERS: {
    LIST: '/orders',
    GET_BY_ID: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },

  // Products/Menu Items
  PRODUCTS: {
    LIST: (domain: string) => `https://${domain}/cp/api/store/products`,
    GET_BY_ID: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
  },

  // Customers
  CUSTOMERS: {
    LIST: '/customers',
    GET_BY_ID: (id: string) => `/customers/${id}`,
    CREATE: '/customers',
    UPDATE: (id: string) => `/customers/${id}`,
  },
} as const;

