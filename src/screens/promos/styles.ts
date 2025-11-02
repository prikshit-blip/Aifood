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
    promoCard: {
      marginBottom: spacing?.md || 16,
    },
    promoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    promoInfo: {
      flex: 1,
      marginRight: spacing?.md || 12,
    },
    discountBadge: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default createStyles;

