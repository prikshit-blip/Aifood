import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { useAuthStore } from '../store/stores/authStore';
import { useTenantStore } from '../store/stores/tenantStore';
import { useSessionStore } from '../store/stores/sessionStore';

/**
 * Get base URL from tenant store
 */
const getBaseURL = (): string => {
  const tenant = useTenantStore.getState().tenant;
  return tenant?.baseUrl || 'https://demo.theaihostess.com/api/v1';
};

/**
 * Get base domain from tenant store
 */
const getDomain = (): string => {
  const tenant = useTenantStore.getState().tenant;
  return tenant?.domain || 'demo.theaihostess.com';
};

/**
 * Create axios instance
 */
const apiClient: AxiosInstance = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor
 * - Sets dynamic base URL from tenant store
 * - Adds auth token from auth store
 * - Adds session cookies (sid) from session store
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check if URL is already absolute (starts with http:// or https://)
    // Axios automatically skips baseURL for absolute URLs
    const isAbsoluteUrl = config.url?.startsWith('http://') || config.url?.startsWith('https://');
    
    // Only set baseURL if URL is NOT absolute
    if (!isAbsoluteUrl) {
      config.baseURL = getBaseURL();
    }
    
    // Add auth token from auth store
    const { token, isTokenExpired } = useAuthStore.getState();
    
    if (token && !isTokenExpired()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add session cookies (sid) from session store
    // This is CRITICAL for all API calls after theme fetch
    const { getCookies, getSid } = useSessionStore.getState();
    const cookies = getCookies();
    const sid = getSid();
    
    if (cookies) {
      config.headers.Cookie = cookies;
      console.log('🍪 Added session cookies to request:', cookies.substring(0, 50) + '...');
    } else if (sid) {
      // Fallback: if we only have sid, create cookie string
      config.headers.Cookie = `sid=${sid}`;
      console.log('🍪 Added sid to request:', sid);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Auto-logout on 401
 * - Error normalization
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return response data directly
    return response.data;
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized - Auto logout
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
      // TODO: Navigate to login screen
    }

    // Handle network errors
    if (!error.response) {
      const networkError = {
        message: 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }

    // Handle API errors
    const apiError = {
      message: (error.response.data as any)?.message || error.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;

