import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(50);

  const { themeData } = useThemeContext();

  // 👇 Generate themed styles once themeData changes
  const styles = useMemo(() => createStyles(themeData), [themeData]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('SignIn');
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, slideAnim, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={ 'light-content'}
        backgroundColor={themeData?.sections?.colors?.primary || '#FF6B35'}
      />
      <View style={styles.content}>
        {/* Logo/Icon */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>AI</Text>
          </View>
        </Animated.View>

        {/* App Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.appName}>{themeData?.appName || 'AIFood'}</Text>
          <Text style={styles.tagline}>
            {themeData?.tagline || 'Smart Food Solutions'} {' '}
            {themeData?.mapping?.domain||""}
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          style={[styles.loadingContainer, { opacity: fadeAnim }]}
        >
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  transform: [{ scaleX: scaleAnim }],
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

/**
 * ✅ Dynamic Styles Generator
 * You can use all your themeData values here:
 * colors, fonts, radius, spacing, shadows, etc.
 */
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.primaryColor || '#FF6B35',
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
      backgroundColor: theme?.secondaryColor || '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    logoText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: theme?.primaryColor || '#FF6B35',
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 60,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme?.textPrimary || '#FFFFFF',
      marginBottom: 8,
      textAlign: 'center',
    },
    tagline: {
      fontSize: 16,
      color: theme?.textSecondary || '#FFFFFF',
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
      backgroundColor: theme?.loaderBg || 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      overflow: 'hidden',
    },
    loadingProgress: {
      height: '100%',
      backgroundColor: theme?.loaderFill || '#FFFFFF',
      borderRadius: 2,
      transformOrigin: 'left',
    },
  });

export default SplashScreen;
