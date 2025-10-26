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
import { RootStackParamList } from '../navigation/types';
import { useThemeContext } from '../contexts/ThemeContext';

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={themeData?.sections?.colors?.primary || '#FF6B35'} barStyle="light-content" />
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
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>
              Create your account to explore delicious meals, easy bookings, and fast deliveries — all in one place.
            </Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📞</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
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
            <TouchableOpacity style={styles.signInLink} onPress={handleNavigateToSignIn}>
              <Text style={styles.signInLinkText}>
                Already have an Account? <Text style={styles.signInLinkBold}>Sign in</Text>
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

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    mainContainer:{
      flex: 1,
      backgroundColor: theme?.colors?.primary || '#FF6B35',

    },
    keyboardAvoidingView: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
      backgroundColor: theme?.colors?.primary || '#FF6B35',
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    burgerIcon: {
      width: 50,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    burgerTop: {
      width: 50,
      height: 20,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      marginBottom: 1,
    },
    burgerBottom: {
      width: 50,
      height: 20,
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    content: {
      flex: 1,
      backgroundColor: theme?.colors?.primary || '#FFFFFF',
      position:"absolute",
      bottom:0,
      left:0,
      right:0,
    },
    formContainer: {
      
      borderTopLeftRadius:24,
      borderTopRightRadius:24,
      paddingHorizontal: 16,
      backgroundColor:  '#FFFFFF',
      paddingTop: 10,
      position:'relative',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      position:'static',
      top:0,
      color: theme?.colors?.primary_text || '#000000',
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 32,
      textAlign: 'center',
      color: theme?.colors?.primary_text,
      lineHeight: 20,
      paddingHorizontal: 10,

    },
    inputContainer: {
      marginBottom: 16,
      textAlignVertical:'center',
      
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: 16,
      backgroundColor: '#F8F9FA',
    },
    inputIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: '#000000',
      textAlignVertical:'center',
    },
    eyeIcon: {
      padding: 4,
    },
    eyeIconText: {
      fontSize: 20,
    },
    signUpButton: {
      backgroundColor: '#000000',
      borderRadius: 12,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
    signUpButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:12,

      
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    dividerText: {
      marginHorizontal: 16,
      color: '#999999',
      fontSize: 14,
      fontWeight: '500',
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 32,
    },
    socialButton: {
      width: 64,
      height: 64,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    socialIcon: {
      width: 32,
      height: 32,
    },
    signInLink: {
      alignItems: 'center',
      marginBottom: 16,
    },
    signInLinkText: {
      fontSize: 14,
      color: '#666666',
    },
    signInLinkBold: {
      fontWeight: 'bold',
      color: '#000000',
    },
    skipButton: {
      alignItems: 'center',
      paddingVertical: 12,
    },
    skipButtonText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '500',
    },
  });

export default SignUpScreen;