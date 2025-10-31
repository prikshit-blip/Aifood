import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from '../storage';

/**
 * Auth State Interface
 */
export interface AuthState {
  // State
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  
  // Actions
  login: (token: string, refreshToken: string, expiresIn: number) => void;
  logout: () => void;
  updateToken: (token: string, expiresIn: number) => void;
  isTokenExpired: () => boolean;
  getToken: () => string | null;
}

/**
 * Auth Store
 * Manages authentication state and tokens
 * Auto-persisted to MMKV
 */
export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      // ========== STATE ==========
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      tokenExpiry: null,
      
      // ========== ACTIONS ==========
      
      /**
       * Login user and store tokens
       */
      login: (token, refreshToken, expiresIn) => {
        set((state) => {
          state.isAuthenticated = true;
          state.token = token;
          state.refreshToken = refreshToken;
          state.tokenExpiry = Date.now() + expiresIn * 1000;
        });
      },
      
      /**
       * Logout user and clear all auth data
       */
      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.token = null;
          state.refreshToken = null;
          state.tokenExpiry = null;
        });
      },
      
      /**
       * Update access token after refresh
       */
      updateToken: (token, expiresIn) => {
        set((state) => {
          state.token = token;
          state.tokenExpiry = Date.now() + expiresIn * 1000;
        });
      },
      
      /**
       * Check if token is expired
       */
      isTokenExpired: () => {
        const { tokenExpiry } = get();
        if (!tokenExpiry) return true;
        return Date.now() >= tokenExpiry;
      },
      
      /**
       * Get current token (null if expired)
       */
      getToken: () => {
        const { token, isTokenExpired } = get();
        return isTokenExpired() ? null : token;
      },
    })),
    {
      name: 'auth-storage', // Storage key in MMKV
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist these fields (don't persist methods)
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
      }),
    }
  )
);

// Selectors for optimized re-renders
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectToken = (state: AuthState) => state.token;

