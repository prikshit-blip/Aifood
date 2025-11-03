import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../store/stores/userStore';
import createStyles from './styles';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const { colors, spacing, borderRadius } = useTheme();
  const hasCompletedOnboarding = useUserStore((state: any) => state.hasCompletedOnboarding);
  const styles = useMemo(() => createStyles(colors, spacing, borderRadius), [colors, spacing, borderRadius]);

  const dynamicValues = useMemo(() => ({
    primaryColor: colors?.primary || '#FF6B35',
    logoText: 'AI',
    appTitle: 'AI Hostess Food',
    appSubtitle: 'Smart Food Solutions',
    domain: 'demo.theaihostess.com',
    logoUrl: undefined,
  }), [colors]);

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
        // Check if user has completed onboarding
        if (hasCompletedOnboarding) {
          console.log('✅ Onboarding completed - navigating to Home');
          navigation.replace('MainTabs' as any);
        } else {
          console.log('🆕 First time - navigating to Onboarding');
          navigation.replace('Onboarding' as any);
        }
      }, 1500);
    });
  }, [navigation, hasCompletedOnboarding]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={dynamicValues.primaryColor}
      />
      <View style={styles.content}>
        {/* Logo/Icon - Dynamic with Image support */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          {dynamicValues.logoUrl ? (
            <Image
              source={{ uri: dynamicValues.logoUrl }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logo}>
              <Text style={styles.logoText}>{dynamicValues.logoText}</Text>
            </View>
          )}
        </Animated.View>

        {/* App Title - Dynamic from theme */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.appName}>{dynamicValues.appTitle}</Text>
          <Text style={styles.tagline}>
            {dynamicValues.appSubtitle}
            {dynamicValues.domain ? ` • ${dynamicValues.domain}` : ''}
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

export default SplashScreen;


