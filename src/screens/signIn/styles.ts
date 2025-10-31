import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeSpacing, ThemeBorderRadius } from '../../store/stores/themeStore';

export const createStyles = (
  colors: ThemeColors | undefined,
  spacing: ThemeSpacing | undefined,
  borderRadius: ThemeBorderRadius | undefined
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.primary || '#FF6B35',
    },
    mainContainer: {
      flex: 1,
      backgroundColor: colors?.primary || '#FF6B35',
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: spacing?.xxl || 40,
      backgroundColor: colors?.primary || '#FF6B35',
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    burgerIcon: {
      width: 50,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    burgerTop: {
      width: 50,
      height: 20,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      marginBottom: 1,
    },
    burgerBottom: {
      width: 50,
      height: 20,
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    content: {
      flex: 1,
      backgroundColor: colors?.primary || '#FFFFFF',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    formContainer: {
      borderTopLeftRadius: borderRadius?.lg || 24,
      borderTopRightRadius: borderRadius?.lg || 24,
      paddingHorizontal: spacing?.md || 16,
      backgroundColor: '#FFFFFF',
      paddingTop: spacing?.md || 18,
      position: 'relative',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: spacing?.sm || 10,
      textAlign: 'center',
      position: 'static',
      top: 0,
      color: colors?.normalText|| '#000000',
    },
    subtitle: {
      fontSize: 14,
      marginBottom: spacing?.xl || 32,
      textAlign: 'center',
      color: colors?.lightText || '#666666',
      lineHeight: 20,
      paddingHorizontal: spacing?.sm || 10,
    },
    inputContainer: {
      marginBottom: spacing?.md || 16,
      textAlignVertical: 'center',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors?.border || '#E0E0E0',
      borderRadius: borderRadius?.md || 12,
      paddingHorizontal: spacing?.md || 16,
      backgroundColor: colors?.whiteBackground || '#F8F9FA',
    },
    inputIcon: {
      fontSize: 20,
      marginRight: spacing?.md || 12,
    },
    input: {
      flex: 1,
      paddingVertical: spacing?.md || 16,
      fontSize: 16,
      color: colors?.normalText || '#000000',
      textAlignVertical: 'center',
    },
    eyeIcon: {
      padding: 4,
    },
    eyeIconText: {
      fontSize: 20,
    },
    signUpButton: {
      backgroundColor: colors?.secondaryBackground || '#000000',
      borderRadius: borderRadius?.md || 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing?.sm || 8,
      marginBottom: spacing?.sm || 8,
      height: 50,
    },
    signUpButtonText: {
      color: colors?.whiteText || '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: '#999999',
      fontSize: 14,
      fontWeight: '500',
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 32,
    },
    socialButton: {
      width: 50,
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    socialIcon: {
      width: 32,
      height: 32,
    },
    signInLink: {
      alignItems: 'center',
      marginBottom: 16,
    },
    signInLinkText: {
      fontSize: 14,
      color: '#666666',
    },
    signInLinkBold: {
      fontWeight: 'bold',
      color: '#000000',
    },
    skipButton: {
      alignItems: 'center',
      paddingVertical: 12,
      marginBottom: 30,
    },
    skipButtonText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '500',
    },
  });

export default createStyles;


