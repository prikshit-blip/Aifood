import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    // ErrorFallback styles
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing?.lg || 20,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
    } as ViewStyle,
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.md || 12,
      textAlign: 'center',
    } as TextStyle,
    message: {
      fontSize: 16,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.md || 8,
      textAlign: 'center',
    } as TextStyle,
    screenName: {
      fontSize: 12,
      color: colors?.greyText || '#999999',
      marginBottom: spacing?.md || 8,
      textAlign: 'center',
      fontStyle: 'italic',
    } as TextStyle,
    button: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.lg || 24,
      paddingVertical: spacing?.md || 12,
      borderRadius: borderRadius?.md || 8,
      marginTop: spacing?.md || 16,
    } as ViewStyle,
    buttonText: {
      color: colors?.whiteText || '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    } as TextStyle,
    // CategoryErrorFallback styles
    categoryContainer: {
      paddingVertical: spacing?.md || 16,
      paddingHorizontal: spacing?.md || 16,
      backgroundColor: colors?.greyBackground || '#F5F5F5',
      borderRadius: borderRadius?.md || 8,
      marginHorizontal: spacing?.md || 16,
      marginVertical: spacing?.sm || 8,
      alignItems: 'center',
    } as ViewStyle,
    categoryErrorText: {
      fontSize: 14,
      color: colors?.error || '#FF4444',
      marginBottom: spacing?.xs || 4,
      textAlign: 'center',
    } as TextStyle,
    categoryRetryButton: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.md || 16,
      paddingVertical: spacing?.xs || 8,
      borderRadius: borderRadius?.sm || 4,
      marginTop: spacing?.xs || 4,
    } as ViewStyle,
    categoryRetryButtonText: {
      color: colors?.whiteText || '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    } as TextStyle,
  });

export default createStyles;

