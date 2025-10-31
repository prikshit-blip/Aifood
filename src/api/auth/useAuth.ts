import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/stores/authStore';
import { useUserStore } from '../../store/stores/userStore';
import {
  signInApi,
  signUpApi,
  getCurrentUserApi,
  signOutApi,
} from './authApi';
import type { SignInRequest, SignUpRequest, User } from '../types';
import { logger } from '../../utils/logger';

const AUTH_KEYS = {
  user: ['auth', 'user'] as const,
  currentUser: ['auth', 'currentUser'] as const,
};

// Sign In Hook (React Query + Zustand)
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInRequest) => {
      const response = await signInApi(credentials);
      
      // ✅ Use Zustand stores instead of AsyncStorage
      useAuthStore.getState().login(
        response.token,
        response.refreshToken || '',
        3600 // 1 hour expiry (adjust based on your API)
      );
      
      useUserStore.getState().setUser({
        id: response.user.id,
        email: response.user.email,
        name: `${response.user.firstName} ${response.user.lastName}`,
        phone: response.user.phone,
        avatar: response.user.avatar,
        role: 'customer',
      });
      
      logger.event('user_signed_in', { userId: response.user.id });
      
      return response;
    },
    onSuccess: (data) => {
      // Update query cache with user data
      queryClient.setQueryData<User>(AUTH_KEYS.user, data.user);
      queryClient.setQueryData<User>(AUTH_KEYS.currentUser, data.user);
    },
    onError: (error) => {
      logger.error('Sign in failed', error);
    },
  });
};

// Sign Up Hook (React Query + Zustand)
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await signUpApi(data);
      
      // ✅ Use Zustand stores instead of AsyncStorage
      useAuthStore.getState().login(
        response.token,
        response.refreshToken || '',
        3600
      );
      
      useUserStore.getState().setUser({
        id: response.user.id,
        email: response.user.email,
        name: `${response.user.firstName} ${response.user.lastName}`,
        phone: response.user.phone,
        avatar: response.user.avatar,
        role: 'customer',
      });
      
      logger.event('user_signed_up', { userId: response.user.id });
      
      return response;
    },
    onSuccess: (data) => {
      // Update query cache with user data
      queryClient.setQueryData<User>(AUTH_KEYS.user, data.user);
      queryClient.setQueryData<User>(AUTH_KEYS.currentUser, data.user);
    },
    onError: (error) => {
      logger.error('Sign up failed', error);
    },
  });
};

// Get Current User Hook
export const useCurrentUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: async () => {
      const response = await getCurrentUserApi();
      
      // ✅ Update Zustand store instead of AsyncStorage
      useUserStore.getState().updateUser({
        id: response.id,
        email: response.email,
        name: `${response.firstName} ${response.lastName}`,
        phone: response.phone,
        avatar: response.avatar,
      });
      
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
        logger.error('Sign out API error', error);
      }
      
      // ✅ Clear Zustand stores instead of AsyncStorage
      useAuthStore.getState().logout();
      useUserStore.getState().clearUser();
      
      logger.event('user_signed_out');
    },
    onSuccess: () => {
      // Clear all query cache
      queryClient.clear();
    },
  });
};

// Get user from store (synchronous, for immediate access)
export const getStoredUser = (): User | null => {
  return useUserStore.getState().user;
};

// Check if user is authenticated (synchronous)
export const isAuthenticated = (): boolean => {
  return useAuthStore.getState().isAuthenticated;
};

