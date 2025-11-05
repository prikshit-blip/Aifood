import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      padding: spacing?.sm || 8,
      marginBottom: spacing?.md || 16,
      borderRadius: borderRadius?.md || 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    } as ViewStyle,
    content: {
      flexDirection: 'row',
    } as ViewStyle,
    image: {
      width: '40%',
      height: '100%',
      borderRadius: borderRadius?.md || 12,
      backgroundColor: colors?.greyBackground || '#F5F5F5',
    } as ImageStyle,
    details: {
      flex: 1,
      justifyContent: 'space-between',
      marginLeft: spacing?.sm || 8,
    } as ViewStyle,
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: colors?.normalText || '#000000',
      marginBottom: spacing?.xs || 4,
    } as TextStyle,
    heading: {
      lineHeight: 24,
    } as TextStyle,
    subHeadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,
    subHeading: {
      fontSize: 12,
      color: colors?.lightText || '#666666',
      marginBottom: spacing?.xs || 4,
      maxWidth: '78%',
    } as TextStyle,
    tag: {
      backgroundColor: '#FFD700',
      paddingHorizontal: spacing?.xs || 8,
      paddingVertical: 2,
      borderRadius: borderRadius?.sm || 4,
      marginRight: spacing?.xs || 4,
    } as ViewStyle,
    tagText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#000000',
    } as TextStyle,
    tagsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing?.xs || 4,
    } as ViewStyle,
    dietaryIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    dietaryIcon: {
      width: 16,
      height: 16,
      borderRadius: 2,
      marginRight: spacing?.xs || 4,
    } as ViewStyle,
    dietaryIconVegetarian: {
      backgroundColor: '#4CAF50',
    } as ViewStyle,
    dietaryIconVegan: {
      backgroundColor: '#8BC34A',
    } as ViewStyle,
    dietaryIconNonVegetarian: {
      backgroundColor: '#FF5722',
    } as ViewStyle,
    description: {
      fontSize: 12,
      color: colors?.greyText || '#666666',
      marginBottom: spacing?.sm || 8,
    } as TextStyle,
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    } as ViewStyle,
    price: {
      fontSize: 18,
      fontWeight: '700',
      color: colors?.normalText || '#000000',
    } as TextStyle,
    favoriteButton: {
      padding: 4,
    } as ViewStyle,
    favoriteIcon: {
      width: 20,
      height: 18,
    } as ImageStyle,
  });

export default createStyles;

