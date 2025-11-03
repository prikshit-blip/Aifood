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
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      padding: spacing?.md || 16,
      paddingBottom: 100, // Space for bottom tab
    },
    suspenseFallbackScrollView: {
      flex: 1,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      padding: spacing?.md || 16,
      paddingBottom: 100, // Space for bottom tab
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.lg || 24,
    } as TextStyle,
    promoCard: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderRadius: borderRadius?.md || 12,
      padding: spacing?.md || 16,
      marginBottom: spacing?.md || 16,
      borderWidth: 1,
      borderColor: colors?.greyBackground || '#F5F5F5',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    } as ViewStyle,
    promoCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    promoCardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      flex: 1,
    } as TextStyle,
    discountBadge: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.sm || 12,
      paddingVertical: spacing?.xs || 6,
      borderRadius: borderRadius?.sm || 6,
    } as ViewStyle,
    discountBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors?.whiteText || '#FFFFFF',
    } as TextStyle,
    promoDescription: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.sm || 8,
    } as TextStyle,
    codeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing?.xs || 4,
    } as ViewStyle,
    codeLabel: {
      fontSize: 12,
      color: colors?.greyText || '#666666',
      marginRight: spacing?.xs || 4,
    } as TextStyle,
    codeValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors?.primary || '#FF6B35',
    } as TextStyle,
    validUntil: {
      fontSize: 11,
      color: colors?.greyText || '#999999',
      marginTop: spacing?.xs || 4,
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
    shimmerCard: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderRadius: borderRadius?.md || 12,
      padding: spacing?.md || 16,
      marginBottom: spacing?.md || 16,
      borderWidth: 1,
      borderColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    shimmerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    shimmerCodeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing?.xs || 4,
    } as ViewStyle,
    syncModeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.lg || 24,
    } as TextStyle,
    syncModeDescription: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.md || 16,
    } as TextStyle,
  });

export default createStyles;

