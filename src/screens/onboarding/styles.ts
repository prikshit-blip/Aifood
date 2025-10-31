import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const createStyles = (theme: any, themeData: any) => {
  const colors = (theme?.colors || themeData?.sections?.colors || {}) as {
    primary?: string;
    background?: string;
    text?: string;
    box_background?: string;
    box_text?: string;
  };
  const buttons = (theme?.buttons || themeData?.sections?.buttons || {}) as {
    primary_button?: { background?: string; text_color?: string };
    secondary_button?: { background?: string; text_color?: string };
  };

  const backgroundColor = '#FFFFFF';
  const textColor = colors.text || '#000000';
  const cardBackground = colors.box_background || '#FFFFFF';
  const primaryButtonBg = buttons.primary_button?.background || '#000000';
  const primaryButtonText = buttons.primary_button?.text_color || '#FFFFFF';
  const secondaryButtonBg = buttons.secondary_button?.background || '#F5F5F5';
  const secondaryButtonText = buttons.secondary_button?.text_color || '#000000';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContent: {
      flexGrow: 1,
    },
    illustrationContainer: {
      height: height * 0.5,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,

      backgroundColor: backgroundColor,
      overflow: 'hidden',
    },
    illustration: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingTop: 20,

    },
    card: {
      backgroundColor: cardBackground,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: width * 0.08,
      paddingTop: 20,
      paddingBottom: 50,
      minHeight: height * 0.4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10,
    },
    titleContainer: {
      width:"100%",
      justifyContent:'center',
      alignItems:'center',
      paddingBottom:30,
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
      gap: 15,
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


