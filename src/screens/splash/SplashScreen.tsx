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
import { useThemeContext } from '../../contexts/ThemeContext';
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

  const { themeData } = useThemeContext();
  const themeSnapshotRef = useRef(themeData);
  const styles = useMemo(() => createStyles(themeSnapshotRef.current), []);

  const dynamicValues = useMemo(() => ({
    primaryColor: themeSnapshotRef.current?.sections?.colors?.primary || '#FF6B35',
    logoText: themeSnapshotRef.current?.sections?.top_nav?.logo_text || 'AI',
    appTitle: 'AI Hostess Food',
    appSubtitle: themeSnapshotRef.current?.sections?.header?.subtitle || 'Smart Food Solutions',
    domain: themeSnapshotRef.current?.mapping?.domain || '',
    logoUrl: themeSnapshotRef.current?.sections?.hero?.url,
  }), []);

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
        navigation.replace('Onboarding' as any);
      }, 1500);
    });
  }, [navigation]);

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


