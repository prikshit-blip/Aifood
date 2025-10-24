import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  themeData: ThemeData | null;
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
      primary: '#ff0000',
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
        background: '#ff0000',
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
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, tenantId }) => {
  const [themeData, setThemeDataState] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadThemeFromStorage();
  }, [tenantId]);

  const loadThemeFromStorage = async () => {
    try {
      setLoading(true);
      const storageKey = tenantId ? `${THEME_STORAGE_KEY}_${tenantId}` : THEME_STORAGE_KEY;
      const storedTheme = await AsyncStorage.getItem(storageKey);

      if (storedTheme) {
        setThemeDataState(JSON.parse(storedTheme));
      } else {
        // ✅ Set default theme if no theme stored
        await AsyncStorage.setItem(storageKey, JSON.stringify(DEFAULT_THEME));
        setThemeDataState(DEFAULT_THEME);
      }
    } catch (err) {
      setError('Failed to load theme');
      console.error('Theme load error:', err);
    } finally {
      setLoading(false);
    }
  };

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
    await loadThemeFromStorage();
  };

  return (
    <ThemeContext.Provider
      value={{
        themeData,
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
