import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from '../storage';

/**
 * User Interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'staff';
  preferences?: {
    language: string;
    notifications: boolean;
    darkMode?: boolean;
    dietaryRestrictions?: string[];
  };
}

/**
 * User State Interface
 */
interface UserState {
  // State
  user: User | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;  // Track if user completed onboarding
  
  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  setLoading: (loading: boolean) => void;
  completeOnboarding: () => void;  // Mark onboarding as complete
  resetOnboarding: () => void;     // Reset onboarding (for testing)
}

/**
 * User Store
 * Manages user profile and preferences
 * Auto-persisted to MMKV
 */
export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      // ========== STATE ==========
      user: null,
      isLoading: false,
      hasCompletedOnboarding: false,
      
      // ========== ACTIONS ==========
      
      /**
       * Set user data (typically after login)
       */
      setUser: (user) => {
        set((state) => {
          state.user = user;
          state.isLoading = false;
        });
      },
      
      /**
       * Update specific user fields
       */
      updateUser: (updates) => {
        set((state) => {
          if (state.user) {
            state.user = { ...state.user, ...updates };
          }
        });
      },
      
      /**
       * Clear user data (logout)
       */
      clearUser: () => {
        set((state) => {
          state.user = null;
          state.isLoading = false;
          // Keep onboarding state even after logout
          // state.hasCompletedOnboarding = false;  // Uncomment to reset on logout
        });
      },
      
      /**
       * Update user preferences
       */
      updatePreferences: (preferences) => {
        set((state) => {
          if (state.user) {
            state.user.preferences = {
              ...state.user.preferences,
              ...preferences,
            };
          }
        });
      },
      
      /**
       * Set loading state
       */
      setLoading: (loading) => {
        set((state) => {
          state.isLoading = loading;
        });
      },
      
      /**
       * Mark onboarding as completed
       * Called when user clicks EXPLORE or SIGN UP
       */
      completeOnboarding: () => {
        set((state) => {
          state.hasCompletedOnboarding = true;
        });
      },
      
      /**
       * Reset onboarding state (for testing)
       */
      resetOnboarding: () => {
        set((state) => {
          state.hasCompletedOnboarding = false;
        });
      },
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selectors
export const selectUser = (state: UserState) => state.user;
export const selectUserEmail = (state: UserState) => state.user?.email;
export const selectUserPreferences = (state: UserState) => state.user?.preferences;

