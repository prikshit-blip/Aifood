import { useMemo } from 'react';
import { useThemeStore } from '../store/stores/themeStore';

/**
 * Theme hook with easy access to theme tokens
 */
export const useTheme = () => {
  const theme = useThemeStore((state: any) => state.theme);
  const isLoading = useThemeStore((state: any) => state.isLoading);
  
  // Memoized tokens for performance
  const colors = useMemo(() => theme?.colors, [theme]);
  const spacing = useMemo(() => theme?.spacing, [theme]);
  const borderRadius = useMemo(() => theme?.borderRadius, [theme]);
  const shadows = useMemo(() => theme?.shadows, [theme]);
  
  return {
    theme,
    colors,
    spacing,
    borderRadius,
    shadows,
    isLoading,
  };
};

