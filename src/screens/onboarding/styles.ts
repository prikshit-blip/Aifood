import { Dimensions, StyleSheet } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

const { width, height } = Dimensions.get('window');

export const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) => {
  const backgroundColor = colors?.background || '#FFFFFF';
  const textColor = colors?.text || '#000000';
  const cardBackground = colors?.surface || '#FFFFFF';
  const primaryButtonBg = colors?.text || '#000000';
  const primaryButtonText = '#FFFFFF';
  const secondaryButtonBg = colors?.surface || '#F5F5F5';
  const secondaryButtonText = colors?.text || '#000000';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
    },
    scrollContent: {
      flexGrow: 1,
    },
    illustrationContainer: {
      height: height * 0.5,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing?.lg || 20,
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      overflow: 'hidden',
    },
    illustration: {
      width: '100%',
      height: '100%',
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingTop: spacing?.lg || 20,
    },
    card: {
      backgroundColor: colors?.whiteBackground || '#FFFFFF',
      borderTopLeftRadius:  borderRadius?.xlg || 40,
      borderTopRightRadius:  borderRadius?.xlg || 40,
      paddingHorizontal: spacing?.xl || 32,
      paddingTop: spacing?.lg || 20,
      paddingBottom: spacing?.xxl || 50,
      minHeight: height * 0.4,
      shadowColor: colors?.secondaryBackground || '#000000',
      shadowOffset: { width: 0, height: 50 },
      // shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10,
    },
    titleContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: spacing?.xl || 30,
    },
    title: {      
      textAlign: 'center',
      
    },
    description: { 
      fontSize:14,     
      opacity: 0.7,
      textAlign: 'center',
      width: '100%',     
      paddingHorizontal:0,
      
    },
    buttonsContainer: {
      gap: spacing?.md || 15,
      width: '100%',
    },
    shimmerTitle: {
      marginBottom: spacing?.md || 16,
    },
    shimmerDescription: {
      marginBottom: spacing?.xs || 4,
    },
    shimmerButton: {
      marginBottom: spacing?.md || 16,
    },
    shimmerIllustration: {
      width: width,
      height: height * 0.6,
      borderRadius: 0,
    },
    buttonFullWidth: {
      width: '100%',
    },
    button: {
      width: '100%',
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    primaryButton: {
      backgroundColor: primaryButtonBg,
    },
    secondaryButton: {
      backgroundColor: secondaryButtonBg,
      borderWidth: 1.5,
      borderColor: textColor,
    },
    buttonText: {
      fontSize: width * 0.045,
      fontWeight: '600',
      letterSpacing: 1,
    },
    primaryButtonText: {
      color: primaryButtonText,
    },
    secondaryButtonText: {
      color: secondaryButtonText,
    },
  });
};

export default createStyles;


