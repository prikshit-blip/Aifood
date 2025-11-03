import React, { Suspense, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../store/stores/userStore';
import { getImage } from '../../assests';
import AppButton from '../../components/ui/AppButton';
import AppHeading from '../../components/ui/AppHeading';
import AppText from '../../components/ui/AppText';
import Shimmer from '../../components/ui/Shimmer';
import createStyles from './styles';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { colors, spacing, borderRadius } = useTheme();
  const { completeOnboarding } = useUserStore();

  const styles = useMemo(() => createStyles(colors, spacing, borderRadius), [colors, spacing, borderRadius]);

  const handleSignUp = () => {
    // Mark onboarding as complete
    completeOnboarding();
    navigation.replace('SignUp');
  };

  const handleExplore = () => {
    // Mark onboarding as complete
    completeOnboarding();
    navigation.replace('MainTabs');  // Navigate to MainTabs instead of SignIn
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors?.whiteBackground || '#FFFFFF'}
      />
      {/* Illustration Section - Top 60% */}
      <Suspense
        fallback={
          <View style={styles.illustrationContainer}>
            <Shimmer
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.6}
              borderRadius={0}
              style={styles.shimmerIllustration}
            />
          </View>
        }
      >
        <View style={styles.illustrationContainer}>
          <Image
            source={getImage('onboardingImage') || ""}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </Suspense>

      <Suspense
        fallback={
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.titleContainer}>
                  <Shimmer width="80%" height={32} borderRadius={8} style={styles.shimmerTitle} />
                  <Shimmer width="100%" height={16} borderRadius={4} style={styles.shimmerDescription} />
                  <Shimmer width="90%" height={16} borderRadius={4} />
                </View>
                <View style={styles.buttonsContainer}>
                  <Shimmer width="100%" height={48} borderRadius={borderRadius?.md || 8} style={styles.shimmerButton} />
                  <Shimmer width="100%" height={48} borderRadius={borderRadius?.md || 8} />
                </View>
              </View>
            </View>
          </ScrollView>
        }
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Content Card Section - Bottom 40% */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Title */}
              <View style={styles.titleContainer}>
                <AppHeading style={styles.title}>Your Food, Your Way</AppHeading>

                {/* Description */}
                <AppText
                  color={colors?.greyText}
                  style={styles.description}
                >
                  Whether you're picking up, getting it delivered, booking a table, or dining in — we've got you covered with seamless options for every craving.
                </AppText>
              </View>

              {/* Buttons Container */}
              <View style={styles.buttonsContainer}>
                <AppButton
                  title="SIGN UP"
                  variant="outline"
                  onPress={handleSignUp}
                  style={styles.buttonFullWidth}
                />
                <AppButton
                  title="EXPLORE"
                  variant="secondary"
                  onPress={handleExplore}
                  style={styles.buttonFullWidth}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Suspense>
    </SafeAreaView>
  );
};

export default OnboardingScreen;


