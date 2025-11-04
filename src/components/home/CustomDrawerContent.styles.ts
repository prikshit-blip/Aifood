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
    contentContainer: {
      flexGrow: 1,
      paddingTop: spacing?.xl || 40,
      // paddingHorizontal: spacing?.md || 16,
    } as ViewStyle,
    headerSection: {
      
      padding: spacing?.xs|| 4,
      
    } as ViewStyle,
    guestSection: {
      marginBottom: spacing?.xs || 4,
    } as ViewStyle,
    guestLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    guestUnderline: {
      height: 2,
      backgroundColor: '#2196F3', // Light blue underline
      width: '100%',
    } as ViewStyle,
    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors?.normalText || '#000000',
    } as TextStyle,
    itemsContainer: {
      flex: 1,
    } as ViewStyle,
    drawerItem: {
      paddingVertical: spacing?.md || 16,
      paddingHorizontal: spacing?.xs || 4,
    } as ViewStyle,
    drawerItemLabel: {
      fontSize: 16,
      color: colors?.normalText || '#000000',
      fontWeight: '400',
    } as TextStyle,
    divider: {
      height: 1,
      backgroundColor: colors?.greyBackground || '#F5F5F5',
      marginVertical: 0,
    } as ViewStyle,
    buttonContainer: {
      paddingHorizontal: spacing?.md || 16,
      paddingBottom: spacing?.lg || 24,
      paddingTop: spacing?.md || 16,
      // borderTopWidth: 1,
      // borderTopColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    authButton: {
      marginBottom: spacing?.sm || 8,
      backgroundColor: colors?.normalText || '#000000',
    } as ViewStyle,
    authButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors?.whiteText || '#FFFFFF',
      textTransform: 'uppercase',
    } as TextStyle,
    logoutButton: {
      borderWidth: 1,
      borderColor: colors?.greyText || '#CCCCCC',
    } as ViewStyle,
    logoutButtonText: {
      fontSize: 16,
      fontWeight: '700',
      textTransform: 'uppercase',
    } as TextStyle,
    authButtonContainer: {
      gap: spacing?.sm || 8,
    } as ViewStyle,
  });

export default createStyles;

