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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TENANT_CONFIGS, TenantConfig } from '../config/tenantConfig';
import { RootStackParamList } from '../navigation/types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  navigation,
  route,
}) => {
  const { tenant } = route.params;
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful sign up
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      
      navigation.navigate('Home', { tenant, user });
    } catch (error) {
      Alert.alert('Error', 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    navigation.navigate('SignIn', { tenant });
  };

  const tenantBranding = {
    primaryColor: tenant.primaryColor,
    secondaryColor: tenant.secondaryColor,
    backgroundColor: tenant.backgroundColor,
    textColor: tenant.textColor,
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tenantBranding.backgroundColor,
    },
    header: {
      backgroundColor: tenantBranding.primaryColor,
      paddingVertical: 20,
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: tenantBranding.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: tenantBranding.primaryColor,
    },
    tenantName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: tenantBranding.backgroundColor,
      marginBottom: 5,
    },
    tenantDescription: {
      fontSize: 14,
      color: tenantBranding.backgroundColor,
      opacity: 0.9,
    },
    signUpButton: {
      backgroundColor: tenantBranding.primaryColor,
    },
    signInButton: {
      borderColor: tenantBranding.primaryColor,
      borderWidth: 1,
    },
    signInButtonText: {
      color: tenantBranding.primaryColor,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header with Tenant Info */}
        <View style={dynamicStyles.header}>
          {tenant.logo ? (
            <Image
              source={{ uri: tenant.logo }}
              style={dynamicStyles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={dynamicStyles.logo}>
              <Text style={dynamicStyles.logoText}>
                {tenant.icon || '🍽️'}
              </Text>
            </View>
          )}
          <Text style={dynamicStyles.tenantName}>
            {tenant.name}
          </Text>
          <Text style={dynamicStyles.tenantDescription}>
            {tenant.description}
          </Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Text style={[styles.title, { color: tenantBranding.textColor }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: tenantBranding.textColor }]}>
              Join {tenant.name} today
            </Text>

            {/* Name Fields */}
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                  First Name *
                </Text>
                <TextInput
                  style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                  placeholder="First name"
                  placeholderTextColor="#999"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                  Last Name *
                </Text>
                <TextInput
                  style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                  placeholder="Last name"
                  placeholderTextColor="#999"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                Email Address *
              </Text>
              <TextInput
                style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                Phone Number
              </Text>
              <TextInput
                style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                value={formData.phoneNumber}
                onChangeText={(value) => handleInputChange('phoneNumber', value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                Password *
              </Text>
              <TextInput
                style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                placeholder="Create a password"
                placeholderTextColor="#999"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: tenantBranding.textColor }]}>
                Confirm Password *
              </Text>
              <TextInput
                style={[styles.input, { borderColor: tenantBranding.primaryColor }]}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              <View style={[styles.checkbox, acceptTerms && { backgroundColor: tenantBranding.primaryColor }]}>
                {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.termsText, { color: tenantBranding.textColor }]}>
                I agree to the Terms and Conditions and Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signUpButton, dynamicStyles.signUpButton]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signInButton, dynamicStyles.signInButton]}
              onPress={handleNavigateToSignIn}
            >
              <Text style={[styles.signInButtonText, dynamicStyles.signInButtonText]}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  signUpButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen;
