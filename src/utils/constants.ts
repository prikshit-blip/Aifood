/**
 * Application Constants
 */

// Timing constants
export const TIMING = {
  SPLASH_DURATION: 1500, // 1.5 seconds
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  CACHE_TTL: 3600000, // 1 hour
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// API constants
export const API = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;

// Validation constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
  USER: 'user-storage',
  THEME: 'theme-storage',
  TENANT: 'tenant-storage',
  SESSION: 'session-storage',
} as const;

// App info
export const APP_INFO = {
  NAME: 'AI Hostess Food',
  VERSION: '1.0.0',
  DEFAULT_DOMAIN: 'demo.theaihostess.com',
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_BIOMETRIC_AUTH: false,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
} as const;

