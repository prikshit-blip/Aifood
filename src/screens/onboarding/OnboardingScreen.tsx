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
import { useThemeContext } from '../../contexts/ThemeContext';
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
  const { theme, themeData } = useThemeContext();

  const styles = useMemo(() => createStyles(theme, themeData), [theme, themeData]);

  const dynamicValues = useMemo(() => {
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

    return {
      primaryColor: colors.primary || '#FF6B35',
      backgroundColor: colors.background || '#FFFFFF',
      textColor: colors.text || '#000000',
      primaryButtonBg: buttons.primary_button?.background || '#000000',
      primaryButtonText: buttons.primary_button?.text_color || '#FFFFFF',
      secondaryButtonBg: buttons.secondary_button?.background || '#F5F5F5',
      secondaryButtonText: buttons.secondary_button?.text_color || '#000000',
      boxBackground: colors.box_background || '#F5F5F5',
      boxText: colors.box_text || '#000000',
    };
  }, [theme, themeData]);

  const handleSignUp = () => {
    navigation.replace('SignUp');
  };

  const handleExplore = () => {
    navigation.replace('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={dynamicValues.backgroundColor}
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
              color='#6B6B6B' style={styles.description} >
                Whether you're picking up, getting it delivered, booking a table, or dining in — we've got you covered with seamless options for every craving.
              </AppText>
            </View>

            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
              <AppButton
                title="SIGN UP"
                variant="secondary"
                onPress={handleSignUp}
                style={{ width: '100%' }}
              />
              <AppButton
                title="EXPLORE"
                variant="primary"
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


