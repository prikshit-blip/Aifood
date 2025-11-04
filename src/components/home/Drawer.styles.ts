import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flexDirection: 'row',
    } as ViewStyle,
    drawer: {
      width: 280,
      height: '100%',
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      paddingHorizontal: spacing?.lg || 20,
      paddingTop: spacing?.xl || 40,
    } as ViewStyle,
    userSection: {
      alignItems: 'center',
      paddingBottom: spacing?.lg || 20,
      marginBottom: spacing?.lg || 20,
      borderBottomWidth: 1,
      borderBottomColor: colors?.greyBackground || '#F5F5F5',
    } as ViewStyle,
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors?.secondaryBackground || '#FFF5F0',
    } as ViewStyle,
    avatarIcon: {
      fontSize: 24,
    } as TextStyle,
    userName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors?.primaryText || '#000000',
      marginTop: spacing?.sm || 8,
    } as TextStyle,
    userEmail: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginTop: spacing?.xs || 4,
    } as TextStyle,
    itemsContainer: {
      flex: 1,
    } as ViewStyle,
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: spacing?.md || 16,
      borderRadius: borderRadius?.sm || 8,
    } as ViewStyle,
    drawerItemIcon: {
      fontSize: 20,
      marginRight: spacing?.md || 16,
    } as TextStyle,
    drawerItemLabel: {
      fontSize: 16,
      color: colors?.primaryText || '#000000',
    } as TextStyle,
    divider: {
      height: 1,
      marginHorizontal: 16,
      backgroundColor: colors?.greyBackground || '#F5F5F5',
      marginVertical: spacing?.md || 16,
    } as ViewStyle,
  });

export default createStyles;

