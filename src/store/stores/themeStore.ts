import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from '../storage';

/**
 * Theme Interfaces
 */
export interface ThemeColors {
  // Base colors
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
  border: string;
  
  // Background variants (your requested identifiers)
  primaryBackground: string;      // Maps to primary
  secondaryBackground: string;    // Maps to surface
  whiteBackground: string;        // Always #FFFFFF
  
  // Text variants (your requested identifiers)
  primaryText: string;            // Maps to primary
  whiteText: string;              // Always #FFFFFF
  normalText: string;             // Black #000000
  lightText: string;              // Light gray #666666
  greyText: string;               // Grey #6B6B6B
  
  // Additional background variant
  greyBackground: string;         // Grey #6B6B6B
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  xlg: number;
  full: number;
}

export interface ThemeShadows {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
}

/**
 * Theme State Interface
 */
interface ThemeState {
  // State
  theme: Theme | null;
  isLoading: boolean;
  lastFetched: number | null;
  version: string | null;
  
  // Actions
  setTheme: (theme: Theme) => void;
  updateTheme: (updates: Partial<Theme>) => void;
  clearTheme: () => void;
  setLoading: (isLoading: boolean) => void;
  shouldRefetch: (ttl?: number) => boolean;
}

/**
 * Default Theme
 */
const DEFAULT_THEME: Theme = {
  id: 'default-dark',
  name: 'Default Dark',
  colors: {
    // Base colors
    primary: '#FF0000',
    secondary: '#FF5722',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    error: '#CF6679',
    success: '#4CAF50',
    warning: '#FFC107',
    border: '#333333',
    
    // Background variants
    primaryBackground: '#FF0000',    // Same as primary
    secondaryBackground: '#1E1E1E',  // Same as surface
    whiteBackground: '#FFFFFF',      // Always white
    
    // Text variants
    primaryText: '#FF0000',          // Same as primary
    whiteText: '#FFFFFF',            // Always white
    normalText: '#000000',           // Black
    lightText: '#666666',            // Light gray
    greyText: '#6B6B6B',             // Grey
    
    // Additional background variant
    greyBackground: '#6B6B6B',       // Grey
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xlg: 40,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

/**
 * Theme Store
 * Manages app theme and styling tokens
 * Auto-persisted to MMKV
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    immer((set, get) => ({
      // ========== STATE ==========
      theme: DEFAULT_THEME,
      isLoading: false,
      lastFetched: null,
      version: null,
      
      // ========== ACTIONS ==========
      
      /**
       * Set complete theme (from API)
       */
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
          state.lastFetched = Date.now();
          state.isLoading = false;
        });
      },
      
      /**
       * Update specific theme properties
       */
      updateTheme: (updates) => {
        set((state) => {
          if (state.theme) {
            state.theme = { ...state.theme, ...updates };
          }
        });
      },
      
      /**
       * Reset to default theme
       */
      clearTheme: () => {
        set((state) => {
          state.theme = DEFAULT_THEME;
          state.lastFetched = null;
          state.version = null;
        });
      },
      
      /**
       * Set loading state
       */
      setLoading: (isLoading) => {
        set((state) => {
          state.isLoading = isLoading;
        });
      },
      
      /**
       * Check if theme should be refetched
       * @param ttl Time to live in milliseconds (default 1 hour)
       */
      shouldRefetch: (ttl = 3600000) => {
        const { lastFetched } = get();
        if (!lastFetched) return true;
        return Date.now() - lastFetched > ttl;
      },
    })),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selectors
export const selectTheme = (state: ThemeState) => state.theme;
export const selectColors = (state: ThemeState) => state.theme?.colors;
export const selectSpacing = (state: ThemeState) => state.theme?.spacing;
export const selectBorderRadius = (state: ThemeState) => state.theme?.borderRadius;
export const selectShadows = (state: ThemeState) => state.theme?.shadows;
