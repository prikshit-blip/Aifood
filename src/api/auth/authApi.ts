import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  User,
} from '../types';

// Sign In API call
export const signInApi = async (credentials: SignInRequest): Promise<SignInResponse> => {
  return apiClient.post<SignInResponse>(API_ENDPOINTS.AUTH.SIGN_IN, credentials);
};

// Sign Up API call
export const signUpApi = async (data: SignUpRequest): Promise<SignUpResponse> => {
  return apiClient.post<SignUpResponse>(API_ENDPOINTS.AUTH.SIGN_UP, data);
};

// Get current user API call
export const getCurrentUserApi = async (): Promise<User> => {
  return apiClient.get<User>(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
};

// Sign Out API call
export const signOutApi = async (): Promise<void> => {
  return apiClient.post(API_ENDPOINTS.AUTH.SIGN_OUT);
};

// Refresh token API call
export const refreshTokenApi = async (refreshToken: string): Promise<{ token: string }> => {
  return apiClient.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
    refreshToken,
  });
};

