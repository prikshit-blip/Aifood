import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { validateEmail, validatePassword } from '../../utils/validators';
import { handleApiError } from '../../utils/errorHandler';
import AppTextInput from '../../components/ui/AppTextInput';
import { createStyles } from './styles';
import FastImage from 'react-native-fast-image';
import { ICONS } from '../../assests';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { login } = useAuth();
  const { colors, spacing, borderRadius } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized styles using new theme tokens
  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  const handleSignIn = async () => {
    // Validate email
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.login(email, password);
      
      // Mock login with Zustand store
      login(
        'mock-token-' + Date.now(),
        'mock-refresh-token',
        3600,
        {
          id: '1',
          email: email,
          name: email.split('@')[0],
          role: 'customer',
          preferences: {
            language: 'en',
            notifications: true,
          },
        }
      );

      navigation.navigate({ name: 'MainTabs', params: undefined });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate({ name: 'MainTabs', params: undefined });
  };

  const handleSignUp = () => {
    navigation.navigate({ name: 'SignUp', params: undefined });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors?.primary || '#FF6B35'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.mainContainer}>
          {/* Header with Logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.burgerIcon}>
                <View style={styles.burgerTop} />
                <View style={styles.burgerBottom} />
              </View>
            </View>
          </View>

          {/* Form Section */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>
                Create your account to explore delicious meals, easy bookings, and fast deliveries — all in one place.
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <AppTextInput
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={<Image source={ICONS.mailBig} style={styles.inputIconImage} />}
                //   containerStyle={styles.inputWrapper}
                //   inputStyle={styles.input}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <AppTextInput
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  leftIcon={<FastImage source={ICONS.passwordBig} style={styles.inputIconImage} />}
                  rightIcon={<Image source={ICONS.eyeBig} style={styles.inputIconImage} />}
                  onPressRightIcon={() => setShowPassword(!showPassword)}
                  // containerStyle={styles.inputWrapper}
                  // inputStyle={styles.input}
                />
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                <Text style={styles.signUpButtonText}>
                  {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                </Text>
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={{ uri: 'https://www.google.com/favicon.ico' }}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={{ uri: 'https://www.facebook.com/favicon.ico' }}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image
                    source={{ uri: 'https://www.apple.com/favicon.ico' }}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Sign In Link */}
              <TouchableOpacity style={styles.signInLink} onPress={handleSignUp}>
                <Text style={styles.signInLinkText}>
                  New User <Text style={styles.signInLinkBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>

              {/* Skip Button */}
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip for Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;


