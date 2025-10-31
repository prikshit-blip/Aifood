import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
import { useThemeContext } from '../../contexts/ThemeContext';
import AppHeading from '../../components/ui/AppHeading';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import AppTextInput from '../../components/ui/AppTextInput';
import { ICONS } from '../../assests';
import createStyles from './styles';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { themeData } = useThemeContext();
  const styles = createStyles(themeData?.sections);

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const user = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1] || '',
        email: email,
        phone: phone,
      };

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const primaryColor = themeData?.sections?.colors?.primary || '#FF6B35';

  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
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
            <AppHeading style={styles.title}>Sign Up</AppHeading>
            <AppText style={styles.subtitle}>
              Create your account to explore delicious meals, easy bookings, and fast deliveries — all in one place.
            </AppText>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <AppTextInput
                placeholder="Name"
                leftIcon={<Image source={ICONS.user} style={styles.inputIconImage}  />}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <AppTextInput
                placeholder="Email"
                leftIcon={<Image source={ICONS.mailBig} style={styles.inputIconImage} />}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <AppTextInput
                placeholder="Phone"
                leftIcon={<Image source={ICONS.phoneBig} style={styles.inputIconImage} />}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <AppTextInput
                placeholder="Password"
                leftIcon={<Image source={ICONS.passwordBig} style={styles.inputIconImage} />}
                rightIcon={<Image source={ICONS.eyeBig} style={styles.inputIconImage} />}
                onPressRightIcon={() => setShowPassword(!showPassword)}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Sign Up Button */}
            <AppButton
              title={isLoading ? 'SIGNING UP...' : 'SIGN UP'}
              variant="primary"
              onPress={handleSignUp}
              loading={isLoading}
              style={{ width: '100%' }}
            />

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
            <TouchableOpacity style={styles.signInLink} onPress={handleNavigateToSignIn}>
              <AppText style={styles.signInLinkText}>
                Already have an Account? <Text style={styles.signInLinkBold}>Sign in</Text>
              </AppText>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <AppText style={styles.skipButtonText}>Skip for Now</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
       </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;


