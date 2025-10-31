// Navigation types for the entire app
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

// Navigation prop types
export type NavigationProp = import('@react-navigation/native').NavigationProp<RootStackParamList>;
export type RouteProp<T extends keyof RootStackParamList> = import('@react-navigation/native').RouteProp<RootStackParamList, T>;

// Screen component prop types
export type SplashScreenProps = {
  navigation: NavigationProp;
  route: RouteProp<'Splash'>;
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

// Note: SignUp route does not accept params
