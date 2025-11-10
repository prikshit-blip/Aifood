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
      paddingBottom: 180, // Space for bottom tab and button
    } as ViewStyle,
    section: {
      // marginBottom: spacing?.xl || 32,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors?.normalText || '#000000',
      marginBottom: spacing?.md || 16,
    } as TextStyle,
    // Gift Card Selection Styles
    giftCardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    } as ViewStyle,
    giftCardOption: {
      width: '48%',
      aspectRatio: 1,
      borderRadius: borderRadius?.md || 12,
      padding: spacing?.md || 16,
      borderWidth: 2,
      borderColor: colors?.border || '#E0E0E0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing?.md || 16,
    } as ViewStyle,
    giftCardOptionSelected: {
      borderColor: colors?.primary || '#FF6B35',
    } as ViewStyle,
    giftCardImageContainer: {
      width: '100%',
      height: '60%',
      marginBottom: spacing?.sm || 8,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    giftCardImagePlaceholder: {
      width: 60,
      height: 60,
      borderRadius: borderRadius?.sm || 8,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    } as ViewStyle,
    giftCardOptionText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      textAlign: 'center',
    } as TextStyle,
    giftCardOptionTextSelected: {
      color: colors?.primary || '#FF6B35',
    } as TextStyle,
    // Amount Selection Styles
    amountInput: {
      marginBottom: spacing?.md || 16,
    } as ViewStyle,
    predefinedAmountsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    } as ViewStyle,
    amountButton: {
      flex: 1,
      minWidth: '22%',
      height: 40,
      borderRadius: borderRadius?.md || 12,
      
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing?.sm || 12,
      marginRight: spacing?.sm || 12,
      marginBottom: spacing?.sm || 12,
    } as ViewStyle,
    amountButtonSelected: {
      borderColor: colors?.primary || '#FF6B35',
      backgroundColor: colors?.primary || '#FF6B35',
    } as ViewStyle,
    amountButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors?.normalText || '#000000',
    } as TextStyle,
    amountButtonTextSelected: {
      color: colors?.whiteText || '#FFFFFF',
    } as TextStyle,
    // Input Styles
    inputContainer: {
      marginBottom: spacing?.md || 16,
    } as ViewStyle,
    inputIcon: {
      tintColor:  '#666666',
      width: 20,
      height: 20,
    },
    messageInputContainer: {
      minHeight: 100,
      alignItems: 'flex-start',
    } as ViewStyle,
    addToCartButtonContainer: {
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      paddingHorizontal: spacing?.md || 16,
      paddingBottom: spacing?.md || 16,
      paddingTop: spacing?.sm || 8,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      // borderTopWidth: 1,
      // borderTopColor: colors?.greyBackground || '#F5F5F5',

    } as ViewStyle,
    // Add to Cart Button
    addToCartButton: {
      
      margin:0,
      
      // height: 50,
    } as ViewStyle,
    addToCartButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
    } as TextStyle,
  });

export default createStyles;
