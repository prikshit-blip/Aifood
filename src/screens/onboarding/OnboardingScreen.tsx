import React, { useMemo } from 'react';
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
    navigation.replace('Home');  // Navigate to Home instead of SignIn
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors?.whiteBackground || '#FFFFFF'}
      />
      {/* Illustration Section - Top 60% */}
      <View style={styles.illustrationContainer}>
        <Image
          source={getImage('onboardingImage') || ""}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

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
                style={{ width: '100%' }}
              />
              <AppButton
                title="EXPLORE"
                variant="secondary"
                onPress={handleExplore}
                style={{ width: '100%' }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;


