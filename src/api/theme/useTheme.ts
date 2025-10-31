import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeApi } from './themeApi';
import type { ThemeData } from '../../contexts/ThemeContext';

const THEME_KEYS = {
  theme: (domain: string) => ['theme', domain] as const,
};

const THEME_STORAGE_KEY = '@app_theme_data';

// Get theme domain - can be from props, context, or default
export const getThemeDomain = (domain?: string): string => {
  // TODO: Get from tenant detection logic
  // For now, using default domain
  return domain || 'demo.theaihostess.com';
};

/**
 * Fetch theme from API
 * @param domain - Tenant domain (optional, defaults to demo domain)
 * @param enabled - Whether to fetch immediately or not
 */
export const useTheme = (domain?: string, enabled: boolean = true) => {
  const themeDomain = getThemeDomain(domain);

  return useQuery({
    queryKey: THEME_KEYS.theme(themeDomain),
    queryFn: async () => {
      // Fetch from API
      const themeData = await getThemeApi(themeDomain);

      // Save to AsyncStorage for offline use
      const storageKey = `${THEME_STORAGE_KEY}_${themeDomain}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(themeData));

      return themeData;
    },
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes - theme doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Refresh theme from API
 */
export const useRefreshTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domain?: string) => {
      const themeDomain = getThemeDomain(domain);
      const themeData = await getThemeApi(themeDomain);

      // Save to AsyncStorage
      const storageKey = `${THEME_STORAGE_KEY}_${themeDomain}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(themeData));

      // Update query cache
      queryClient.setQueryData(THEME_KEYS.theme(themeDomain), themeData);

      return themeData;
    },
  });
};

/**
 * Get theme from AsyncStorage (for initial load before API fetch)
 */
export const getStoredTheme = async (domain?: string): Promise<ThemeData | null> => {
  try {
    const themeDomain = getThemeDomain(domain);
    const storageKey = `${THEME_STORAGE_KEY}_${themeDomain}`;
    const storedTheme = await AsyncStorage.getItem(storageKey);

    if (storedTheme) {
      return JSON.parse(storedTheme) as ThemeData;
    }
    return null;
  } catch (error) {
    console.error('Error getting stored theme:', error);
    return null;
  }
};

