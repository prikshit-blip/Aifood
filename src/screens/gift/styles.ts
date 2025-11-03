import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
    } as ViewStyle,
    scrollView: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      padding: spacing?.md || 16,
      paddingBottom: 100, // Space for bottom tab
    } as ViewStyle,
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.sm || 8,
    } as TextStyle,
    description: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.lg || 24,
    } as TextStyle,
    giftCard: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderRadius: borderRadius?.md || 12,
      padding: spacing?.md || 16,
      marginBottom: spacing?.md || 16,
      borderWidth: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    } as ViewStyle,
    giftCardAvailable: {
      borderColor: colors?.primary || '#FF6B35',
      opacity: 1,
    } as ViewStyle,
    giftCardUnavailable: {
      borderColor: colors?.greyBackground || '#E0E0E0',
      opacity: 0.6,
    } as ViewStyle,
    giftCardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,
    giftCardDetails: {
      flex: 1,
    } as ViewStyle,
    giftCardTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    giftCardDescription: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.sm || 8,
    } as TextStyle,
    unavailableText: {
      fontSize: 12,
      color: colors?.error || '#FF4444',
      marginTop: spacing?.xs || 4,
    } as TextStyle,
    giftCardValue: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.md || 16,
      paddingVertical: spacing?.sm || 8,
      borderRadius: borderRadius?.sm || 8,
    } as ViewStyle,
    giftCardValueText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors?.whiteText || '#FFFFFF',
    } as TextStyle,
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing?.xl || 40,
    } as ViewStyle,
    emptyStateText: {
      fontSize: 16,
      color: colors?.greyText || '#666666',
      textAlign: 'center',
    } as TextStyle,
  });

export default createStyles;
