import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import TenantSelector from '../components/TenantSelector';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

// Import types
import { TenantConfig } from '../config/tenantConfig';

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  TenantSelector: undefined;
  SignIn: { tenant: TenantConfig };
  SignUp: { tenant: TenantConfig };
  Home: { 
    tenant: TenantConfig;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{
              gestureEnabled: false,
            }}
          />
         
          <Stack.Screen 
            name="SignIn" 
            component={SignInScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
