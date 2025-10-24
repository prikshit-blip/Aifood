// hooks/useThemedStyles.ts
import { useMemo } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useThemeContext } from '../contexts/ThemeContext';

// Helper hook to create themed styles
export const useThemedStyles = () => {
  const { themeData } = useThemeContext();

  const colors = useMemo(() => ({
    primary: themeData?.sections.colors.primary || '#007AFF',
    background: themeData?.sections.colors.background || '#FFFFFF',
    text: themeData?.sections.colors.background_text || '#000000',
    primaryText: themeData?.sections.colors.primary_text || '#000000',
    boxBackground: themeData?.sections.colors.box_background || '#F5F5F5',
    boxText: themeData?.sections.colors.box_text || '#000000',
    highlight: themeData?.sections.highlight.highlight_color || '#FF5722',
    
    // Navigation colors
    navBackground: themeData?.sections.top_nav.background || '#FFFFFF',
    navText: themeData?.sections.top_nav.text || '#000000',
    
    // Footer colors
    footerBackground: themeData?.sections.footer.background || '#000000',
    footerText: themeData?.sections.footer.text || '#FFFFFF',
    
    // Header colors
    headerBackground: themeData?.sections.header.background_color || '#FFFFFF',
  }), [themeData]);

  const fonts = useMemo(() => ({
    header: {
      fontFamily: themeData?.sections.fonts.header.name || 'System',
      fontWeight: themeData?.sections.fonts.header.weight as TextStyle['fontWeight'] || '700',
    },
    normal: {
      fontFamily: themeData?.sections.fonts.normal.name || 'System',
      fontWeight: themeData?.sections.fonts.normal.weight as TextStyle['fontWeight'] || '400',
    },
  }), [themeData]);

  const buttons = useMemo(() => ({
    primary: {
      background: themeData?.sections.buttons.primary_button.background || '#007AFF',
      text: themeData?.sections.buttons.primary_button.text_color || '#FFFFFF',
      label: themeData?.sections.buttons.primary_button.text || 'Submit',
    },
    secondary: {
      background: themeData?.sections.buttons.secondary_button.background || '#6C757D',
      text: themeData?.sections.buttons.secondary_button.text_color || '#FFFFFF',
      label: themeData?.sections.buttons.secondary_button.text || 'Cancel',
    },
  }), [themeData]);

  return {
    colors,
    fonts,
    buttons,
    themeData,
  };
};

// Hook for creating dynamic stylesheets
export const useCreateThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (theme: ReturnType<typeof useThemedStyles>) => T
) => {
  const theme = useThemedStyles();
  return useMemo(() => StyleSheet.create(stylesFn(theme)), [theme]);
};
