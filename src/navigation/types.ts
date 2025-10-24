// Navigation types for the entire app
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

// Navigation prop types
export type NavigationProp = import('@react-navigation/native').NavigationProp<RootStackParamList>;
export type RouteProp<T extends keyof RootStackParamList> = import('@react-navigation/native').RouteProp<RootStackParamList, T>;

// Screen component prop types
export type SplashScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'Splash'>;
};

export type TenantSelectorScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'TenantSelector'>;
};

export type SignInScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'SignIn'>;
};

export type SignUpScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'SignUp'>;
};

export type HomeScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'Home'>;
};

// Import TenantConfig for type definitions
import { TenantConfig } from '../config/tenantConfig';
