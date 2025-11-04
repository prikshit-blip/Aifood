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
      borderRadius: borderRadius?.md || 12,
      marginBottom: spacing?.md || 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    } as ViewStyle,
    promoImageContainer: {
      width: '100%',
      height: 160,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    } as ViewStyle,
    promoImage: {
      width: '100%',
      height: '100%',
    },
    promoContent: {
      padding: spacing?.md || 16,
    } as ViewStyle,
    promoCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    promoCardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    discountBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      paddingHorizontal: spacing?.sm || 12,
      paddingVertical: spacing?.xs || 6,
      borderRadius: borderRadius?.sm || 6,
      alignSelf: 'flex-start',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    discountBadgeText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    } as TextStyle,
    promoDescription: {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: spacing?.xs || 4,
      opacity: 0.9,
    } as TextStyle,
    promoAmount: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    termsLink: {
      alignSelf: 'flex-start',
      marginBottom: spacing?.md || 16,
      paddingVertical: spacing?.xs || 4,
    } as ViewStyle,
    termsLinkText: {
      fontSize: 12,
      color: '#FFFFFF',
      textDecorationLine: 'underline',
      opacity: 0.9,
    } as TextStyle,
    promoButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: borderRadius?.md || 12,
      paddingVertical: spacing?.sm || 12,
      paddingHorizontal: spacing?.md || 16,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    promoButtonOrder: {
      backgroundColor: '#FFFFFF',
    } as ViewStyle,
    promoButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors?.primaryText || '#000000',
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing?.md || 16,
      paddingVertical: spacing?.sm || 12,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
    } as ViewStyle,
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing?.xs || 8,
    } as ViewStyle,
    backIcon: {
      width: 24,
      height: 24,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      flex: 1,
      textAlign: 'center',
    } as TextStyle,
    headerRight: {
      width: 40,
    } as ViewStyle,
  });

export default createStyles;

