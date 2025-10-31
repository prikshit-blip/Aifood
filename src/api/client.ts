import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get base URL from tenant or config
const getBaseURL = () => {
  // TODO: Auto-detect from tenant domain
  // For now, using default - update this when tenant detection is implemented
  const tenantDomain = 'demo.theaihostess.com'; // Get from tenant detection
  return `https://${tenantDomain}/api/v1`;
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Return response data directly
    return response.data;
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      try {
        // Clear auth data
        await AsyncStorage.removeItem('@auth_token');
        await AsyncStorage.removeItem('@user_data');
        // TODO: Navigate to login screen
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }

    // Handle network errors
    if (!error.response) {
      // Network error or timeout
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

