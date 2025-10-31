import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInApi,
  signUpApi,
  getCurrentUserApi,
  signOutApi,
} from './authApi';
import type { SignInRequest, SignUpRequest, User } from '../types';

const AUTH_KEYS = {
  user: ['auth', 'user'] as const,
  currentUser: ['auth', 'currentUser'] as const,
};

// Storage keys
const STORAGE_KEYS = {
  authToken: '@auth_token',
  userData: '@user_data',
  refreshToken: '@refresh_token',
};

// Sign In Hook
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInRequest) => {
      const response = await signInApi(credentials);
      
      // Save token and user data to storage
      await AsyncStorage.setItem(STORAGE_KEYS.authToken, response.token);
      await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(response.user));
      
      if (response.refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.refreshToken, response.refreshToken);
      }
      
      return response;
    },
    onSuccess: (data) => {
      // Update query cache with user data
      queryClient.setQueryData<User>(AUTH_KEYS.user, data.user);
      queryClient.setQueryData<User>(AUTH_KEYS.currentUser, data.user);
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
};

// Sign Up Hook
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await signUpApi(data);
      
      // Save token and user data to storage
      await AsyncStorage.setItem(STORAGE_KEYS.authToken, response.token);
      await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(response.user));
      
      if (response.refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.refreshToken, response.refreshToken);
      }
      
      return response;
    },
    onSuccess: (data) => {
      // Update query cache with user data
      queryClient.setQueryData<User>(AUTH_KEYS.user, data.user);
      queryClient.setQueryData<User>(AUTH_KEYS.currentUser, data.user);
    },
    onError: (error) => {
      console.error('Sign up error:', error);
    },
  });
};

// Get Current User Hook
export const useCurrentUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: async () => {
      const response = await getCurrentUserApi();
      
      // Update storage with latest user data
      await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(response));
      
      return response;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Sign Out Hook
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await signOutApi();
      } catch (error) {
        // Even if API call fails, clear local data
        console.error('Sign out API error:', error);
      }
      
      // Clear storage
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.authToken,
        STORAGE_KEYS.userData,
        STORAGE_KEYS.refreshToken,
      ]);
    },
    onSuccess: () => {
      // Clear all query cache
      queryClient.clear();
    },
  });
};

// Get user from storage (synchronous, for immediate access)
export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.userData);
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.authToken);
    return !!token;
  } catch (error) {
    return false;
  }
};

