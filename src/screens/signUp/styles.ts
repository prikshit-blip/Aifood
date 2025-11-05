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
    mainContainer:{
      flex: 1,
      backgroundColor: colors?.primary || '#FF6B35',

    },
    keyboardAvoidingView: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
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
      position:"absolute",
      bottom:0,
      left:0,
      right:0,
    },
    formContainer: {
      borderTopLeftRadius:24,
      borderTopRightRadius:24,
      paddingHorizontal: 16,
      backgroundColor:  '#FFFFFF',
      paddingTop: 10,
      position:'relative',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      position:'static',
      top:0,
      color: colors?.normalText || '#000000',
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 32,
      textAlign: 'center',
      color: colors?.lightText,
      lineHeight: 20,
      paddingHorizontal: 10,
    },
    inputContainer: {
      marginBottom: 16,
      textAlignVertical:'center',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: 16,
      backgroundColor: '#F8F9FA',
    },
    inputIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    inputIconImage: {
      
      tintColor:colors?.greyText || '#000000',
      width: 20,
      height: 20,
      marginRight: 6,
      resizeMode: 'contain',
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: '#000000',
      textAlignVertical:'center',
    },
    eyeIcon: {
      padding: 4,
    },
    eyeIconText: {
      fontSize: 20,
    },
    signUpButton: {
      backgroundColor: '#000000',
      borderRadius: 12,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
    signUpButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:12,
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
      marginBottom: 20,
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    socialIcon: {
      width: 28,
      height: 28,
    },
    signInLink: {
      alignItems: 'center',
      marginBottom: 8,
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
      paddingVertical: 10,
      marginBottom: 16,
    },
    skipButtonText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '500',
    },
  });

export default createStyles;


