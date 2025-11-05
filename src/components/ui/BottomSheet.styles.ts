import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    } as ViewStyle,
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000000',
    } as ViewStyle,
    backdropTouchable: {
      flex: 1,
    } as ViewStyle,
    sheetContainer: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderTopLeftRadius: borderRadius?.lg || 20,
      borderTopRightRadius: borderRadius?.lg || 20,
      // iOS shadow
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      // Android shadow
      elevation: 10,
      overflow: 'hidden',
    } as ViewStyle,
    dragHandleContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop: spacing?.sm || 8,
      paddingBottom: spacing?.xs || 4,
    } as ViewStyle,
    dragHandle: {
      width: 40,
      height: 4,
      backgroundColor: colors?.greyBackground || '#E0E0E0',
      borderRadius: 2,
    } as ViewStyle,
    content: {
      flex: 1,
      paddingHorizontal: spacing?.md || 16,
      paddingBottom: spacing?.md || 16,
    } as ViewStyle,
  });

export default createStyles;

