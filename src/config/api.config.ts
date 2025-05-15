// src/config/api.config.ts
// API configuration constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_VERSION = 'v1';
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    PROFILE: (id: string) => `/users/${id}`,
  },
  SETTINGS: {
    BASE: '/settings',
  },
};

// Request retry configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Cache configuration
export const CACHE_CONFIG = {
  ENABLED: true,
  TTL: 60 * 5, // 5 minutes
};

// Rate limiting
export const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 60,
};