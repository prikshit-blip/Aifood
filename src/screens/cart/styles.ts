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
      paddingBottom: 160, // Space for bottom tab and checkout button
    } as ViewStyle,
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.lg || 24,
    } as TextStyle,
    cartItemCard: {
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
    cartItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    cartItemDetails: {
      flex: 1,
    } as ViewStyle,
    cartItemTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    cartItemSubHeading: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    cartItemPrice: {
      fontSize: 16,
      fontWeight: '600',
      color: colors?.primary || '#FF6B35',
      marginTop: spacing?.xs || 4,
    } as TextStyle,
    removeButton: {
      padding: spacing?.xs || 4,
    } as ViewStyle,
    removeIcon: {
      fontSize: 20,
    } as TextStyle,
    cartItemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing?.sm || 8,
      paddingTop: spacing?.sm || 8,
      borderTopWidth: 1,
      borderTopColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors?.greyBackground || '#F5F5F5',
      borderRadius: borderRadius?.sm || 8,
      paddingVertical: spacing?.xs || 4,
    } as ViewStyle,
    quantityButton: {
      paddingHorizontal: spacing?.sm || 12,
      paddingVertical: spacing?.xs || 4,
    } as ViewStyle,
    quantityButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
    } as TextStyle,
    quantityText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      paddingHorizontal: spacing?.md || 16,
      minWidth: 40,
      textAlign: 'center',
    } as TextStyle,
    subtotal: {
      fontSize: 18,
      fontWeight: '700',
      color: colors?.primaryText || '#000000',
    } as TextStyle,
    orderSummaryCard: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderRadius: borderRadius?.md || 12,
      padding: spacing?.md || 16,
      marginTop: spacing?.md || 16,
      borderWidth: 1,
      borderColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    orderSummaryTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.md || 16,
    } as TextStyle,
    orderSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing?.sm || 8,
    } as ViewStyle,
    orderSummaryLabel: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
    } as TextStyle,
    orderSummaryValue: {
      fontSize: 14,
      color: colors?.primaryText || '#000000',
    } as TextStyle,
    orderSummaryDivider: {
      height: 1,
      backgroundColor: colors?.greyBackground || '#F5F5F5',
      marginVertical: spacing?.sm || 8,
    } as ViewStyle,
    orderSummaryTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    } as ViewStyle,
    orderSummaryTotalLabel: {
      fontSize: 20,
      fontWeight: '700',
      color: colors?.primaryText || '#000000',
    } as TextStyle,
    orderSummaryTotalValue: {
      fontSize: 20,
      fontWeight: '700',
      color: colors?.primary || '#FF6B35',
    } as TextStyle,
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing?.xl || 40,
    } as ViewStyle,
    emptyStateIcon: {
      fontSize: 48,
      marginBottom: spacing?.md || 16,
    } as TextStyle,
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      marginBottom: spacing?.sm || 8,
      textAlign: 'center',
    } as TextStyle,
    emptyStateText: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      textAlign: 'center',
      marginBottom: spacing?.lg || 24,
    } as TextStyle,
    emptyStateButton: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.lg || 24,
      paddingVertical: spacing?.md || 12,
      borderRadius: borderRadius?.md || 8,
    } as ViewStyle,
    emptyStateButtonText: {
      color: colors?.whiteText || '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    } as TextStyle,
    checkoutButtonContainer: {
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      padding: spacing?.md || 16,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    checkoutButton: {
      backgroundColor: colors?.primary || '#FF6B35',
      paddingVertical: spacing?.md || 16,
      borderRadius: borderRadius?.md || 8,
      alignItems: 'center',
    } as ViewStyle,
    checkoutButtonText: {
      color: colors?.whiteText || '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
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
