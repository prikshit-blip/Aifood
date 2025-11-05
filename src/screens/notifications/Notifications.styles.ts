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
    listContainer: {
      padding: spacing?.md || 16,
      gap:10,
    } as ViewStyle,
    emptyListContainer: {
      flex: 1,
    } as ViewStyle,
    notificationItem: {
      flexDirection: 'row',
      paddingHorizontal: spacing?.md || 16,
      paddingVertical: spacing?.md || 16,
      borderWidth: 0.5,
      borderColor: colors?.greyText || '#F5F5F5',
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderRadius:15,
    } as ViewStyle,
    unreadNotification: {
      backgroundColor: colors?.whiteBackground || '#FFF5F0',
    } as ViewStyle,
    notificationContent: {
      flex: 1,
      marginRight: spacing?.sm || 8,
    } as ViewStyle,
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing?.xs || 4,
    } as ViewStyle,
    notificationTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors?.normalText || '#000000',
      flex: 1,
    } as TextStyle,
    unreadTitle: {
      fontWeight: '700',
      color: colors?.normalText || '#000000',
    } as TextStyle,
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors?.primary || '#FF6B35',
      marginLeft: spacing?.xs || 4,
    } as ViewStyle,
    notificationMessage: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.xs || 4,
      lineHeight: 20,
    } as TextStyle,
    notificationTime: {
      fontSize: 12,
      color: colors?.greyText || '#999999',
    } as TextStyle,
    typeIndicator: {
      width: 4,
      height: '100%',
      borderRadius: 2,
    } as ViewStyle,
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing?.lg || 24,
    } as ViewStyle,
    emptyIcon: {
      fontSize: 64,
      marginBottom: spacing?.md || 16,
    } as TextStyle,
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors?.normalText || '#000000',
      marginBottom: spacing?.sm || 8,
      textAlign: 'center',
    } as TextStyle,
    emptyMessage: {
      fontSize: 14,
      color: colors?.greyText || '#666666',
      textAlign: 'center',
      lineHeight: 20,
    } as TextStyle,
    headerBadge: {
      fontSize: 14,
      fontWeight: '600',
      color: colors?.primary || '#FF6B35',
      paddingHorizontal: spacing?.sm || 8,
      paddingVertical: spacing?.xs || 4,
      borderRadius: borderRadius?.sm || 12,
      minWidth: 24,
      textAlign: 'center',
    } as TextStyle,
  });

export default createStyles;

