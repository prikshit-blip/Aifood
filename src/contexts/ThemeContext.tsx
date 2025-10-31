import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, getStoredTheme } from '../api/theme/useTheme';
import { normalizeTheme, NormalizedTheme } from './themeFormatter';

// Re-export NormalizedTheme for easier imports
export type { NormalizedTheme } from './themeFormatter';

// Theme Data Types
export interface ThemeData {
  theme: {
    id: number;
    name: string;
    explicit: boolean;
    applied_at: string;
  };
  sections: {
    colors: {
      primary: string;
      box_text: string;
      background: string;
      primary_text: string;
      box_background: string;
      background_text: string;
    };
    fonts: {
      header: FontConfig;
      normal: FontConfig;
    };
    header: {
      title: string;
      subtitle: string;
      background_color: string;
      show_background_image: boolean;
    };
    hero: {
      url: string;
      title: string;
      subtitle: string;
      title_color: string;
      subtitle_color: string;
    };
    buttons: {
      primary_button: ButtonConfig;
      secondary_button: ButtonConfig;
    };
    top_nav: {
      text: string;
      logo_text: string;
      background: string;
    };
    footer: {
      text: string;
      background: string;
      hide_info_box: boolean;
      hide_powered_by: boolean;
    };
    highlight: {
      highlight_color: string;
    };
    menu_bar: {
      hide_category_bar: boolean;
      hide_search_button: boolean;
    };
    item: {
      hide_description: boolean;
    };
    item_layout: {
      hide_category_descriptions: boolean;
    };
  };
  mapping: {
    domain: string;
    store_id: number;
    store_uuid: string;
    business_id: number;
  };
}

interface FontConfig {
  id: number;
  url: string;
  name: string;
  style: string;
  family: string;
  weight: string;
}

interface ButtonConfig {
  text: string;
  background: string;
  text_color: string;
}

interface ThemeContextType {
  // Original nested theme data
  themeData: ThemeData | null;
  
  // ✅ Normalized theme - Easy to use in screens!
  theme: NormalizedTheme | null;
  
  loading: boolean;
  error: string | null;
  setThemeData: (data: ThemeData) => Promise<void>;
  clearTheme: () => Promise<void>;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = '@app_theme_data';

// ✅ Default Theme (Dark Theme)
const DEFAULT_THEME: ThemeData = {
  theme: {
    id: 3,
    name: 'Dark',
    explicit: true,
    applied_at: '2025-10-15T12:45:51.145059',
  },
  sections: {
    colors: {
      primary: '#FF0000',
      box_text: '#FFFFFF',
      background: '#121212',
      primary_text: '#000000',
      box_background: '#1E1E1E',
      background_text: '#FFFFFF',
    },
    fonts: {
      header: {
        id: 1,
        url: 'https://fonts.googleapis.com/css?family=Roboto:400',
        name: 'Roboto',
        style: 'normal',
        family: 'sans-serif',
        weight: '400',
      },
      normal: {
        id: 2,
        url: 'https://fonts.googleapis.com/css?family=Roboto:700',
        name: 'Roboto',
        style: 'normal',
        family: 'sans-serif',
        weight: '700',
      },
    },
    header: {
      title: 'Night Mode',
      subtitle: 'Relax',
      background_color: '#000000',
      show_background_image: false,
    },
    hero: {
      url: '/images/light-hero.jpg',
      title: 'Welcome to Light Theme',
      subtitle: 'Fresh & Bright',
      title_color: '#777777',
      subtitle_color: '#777777',
    },
    buttons: {
      primary_button: {
        text: 'Order Now',
        background: '#FF0000',
        text_color: '#FFFFFF',
      },
      secondary_button: {
        text: 'Learn More',
        background: '#000000',
        text_color: '#ffffff',
      },
    },
    top_nav: {
      text: '#FFFFFF',
      logo_text: 'Test',
      background: '#1E1E1E',
    },
    footer: {
      text: '#FFFFFF',
      background: '#000000',
      hide_info_box: true,
      hide_powered_by: true,
    },
    highlight: {
      highlight_color: '#FF5722',
    },
    menu_bar: {
      hide_category_bar: false,
      hide_search_button: false,
    },
    item: {
      hide_description: true,
    },
    item_layout: {
      hide_category_descriptions: true,
    },
  },
  mapping: {
    domain: 'demo.theaihostess.com',
    store_id: 112,
    store_uuid: '851ba4ac-016c-4e77-aec6-8d7c6d22f771',
    business_id: 42,
  },
};

interface ThemeProviderProps {
  children: ReactNode;
  tenantId?: string;
  domain?: string; // Domain for theme API (e.g., 'demo.theaihostess.com')
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  tenantId,
  domain = 'demo.theaihostess.com', // Default domain, will be auto-detected later
}) => {
  const [themeData, setThemeDataState] = useState<ThemeData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch theme from API using React Query
  const { 
    data: apiThemeData, 
    isLoading: isFetchingTheme, 
    error: themeError,
    refetch: refetchTheme 
  } = useTheme(domain, true); // enabled: true - fetch immediately

  // Load cached theme on mount for instant display
  useEffect(() => {
    const loadCachedTheme = async () => {
      try {
        setInitialLoading(true);
        
        // First, try to load from AsyncStorage for instant display
        const cachedTheme = await getStoredTheme(domain);
        
        if (cachedTheme) {
          setThemeDataState(cachedTheme);
        } else {
          // Fallback to default theme if nothing cached
          setThemeDataState(DEFAULT_THEME);
        }
      } catch (err) {
        console.error('Error loading cached theme:', err);
        setThemeDataState(DEFAULT_THEME);
      } finally {
        setInitialLoading(false);
      }
    };

    loadCachedTheme();
  }, [domain]);

  // Update theme data when API fetch completes
  useEffect(() => {
    if (apiThemeData) {
      setThemeDataState(apiThemeData);
      setError(null);
    }
  }, [apiThemeData]);

  // Handle API errors
  useEffect(() => {
    if (themeError) {
      setError('Failed to fetch theme from API');
      console.error('Theme API error:', themeError);
      // Keep using cached/default theme on error
    }
  }, [themeError]);

  // Combined loading state
  const loading = initialLoading || isFetchingTheme;

  // ✅ Normalize theme data for easy access
  const normalizedTheme = useMemo(() => {
    return normalizeTheme(themeData);
  }, [themeData]);

  const setThemeData = async (data: ThemeData) => {
    try {
      const storageKey = tenantId ? `${THEME_STORAGE_KEY}_${tenantId}` : THEME_STORAGE_KEY;
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      setThemeDataState(data);
      setError(null);
    } catch (err) {
      setError('Failed to save theme');
      console.error('Theme save error:', err);
    }
  };

  const clearTheme = async () => {
    try {
      const storageKey = tenantId ? `${THEME_STORAGE_KEY}_${tenantId}` : THEME_STORAGE_KEY;
      await AsyncStorage.removeItem(storageKey);
      setThemeDataState(DEFAULT_THEME); // ✅ fallback to default
    } catch (err) {
      console.error('Theme clear error:', err);
    }
  };

  const refreshTheme = async () => {
    try {
      const result = await refetchTheme();
      if (result.data) {
        setThemeDataState(result.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to refresh theme');
      console.error('Theme refresh error:', err);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeData,        // Original nested structure (for compatibility)
        theme: normalizedTheme, // ✅ Normalized easy-to-use structure
        loading,
        error,
        setThemeData,
        clearTheme,
        refreshTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
