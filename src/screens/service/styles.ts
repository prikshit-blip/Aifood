import { StyleSheet } from 'react-native';
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
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      marginBottom: spacing?.lg || 24,
    },
    serviceCard: {
      marginBottom: spacing?.md || 16,
    },
    serviceContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceIcon: {
      marginRight: spacing?.md || 16,
    },
    serviceInfo: {
      flex: 1,
    },
  });

export default createStyles;

