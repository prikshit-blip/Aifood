import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const createStyles = (themeData: any) => {
  const colors = themeData?.sections?.colors || {};
  const primaryColor = colors.primary || '#FF6B35';
  const boxBackgroundColor = colors.box_background || '#FFFFFF';
  const primaryTextColor = colors.primary_text || primaryColor;
  const backgroundTextColor = colors.background_text || '#FFFFFF';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: primaryColor,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    logoContainer: {
      marginBottom: 40,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: primaryTextColor,
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 60,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: backgroundTextColor,
      marginBottom: 8,
      textAlign: 'center',
    },
    tagline: {
      fontSize: 16,
      color: backgroundTextColor,
      opacity: 0.9,
      textAlign: 'center',
      fontWeight: '300',
    },
    loadingContainer: {
      position: 'absolute',
      bottom: 100,
      width: width * 0.6,
    },
    loadingBar: {
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      overflow: 'hidden',
    },
    loadingProgress: {
      height: '100%',
      backgroundColor: backgroundTextColor || '#FFFFFF',
      borderRadius: 2,
      transformOrigin: 'left',
    },
  });
};

export default createStyles;


