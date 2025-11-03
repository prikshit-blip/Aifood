// Navigation types for the entire app
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
};

// Drawer Navigation types
export type DrawerParamList = {
  MainTabs: undefined;
};

// Bottom Tab Navigation types
export type BottomTabParamList = {
  Home: undefined;
  Promos: undefined;
  Service: undefined;
  Gift: undefined;
  Cart: undefined;
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

export type MainTabsProps = {
  navigation: NavigationProp;
  route: RouteProp<'MainTabs'>;
};

// Bottom Tab Navigation Props
export type HomeScreenProps = {
  navigation: import('@react-navigation/bottom-tabs').BottomTabNavigationProp<BottomTabParamList, 'Home'>;
  route: import('@react-navigation/native').RouteProp<BottomTabParamList, 'Home'>;
};

export type PromosScreenProps = {
  navigation: import('@react-navigation/bottom-tabs').BottomTabNavigationProp<BottomTabParamList, 'Promos'>;
  route: import('@react-navigation/native').RouteProp<BottomTabParamList, 'Promos'>;
};

export type ServiceScreenProps = {
  navigation: import('@react-navigation/bottom-tabs').BottomTabNavigationProp<BottomTabParamList, 'Service'>;
  route: import('@react-navigation/native').RouteProp<BottomTabParamList, 'Service'>;
};

export type GiftScreenProps = {
  navigation: import('@react-navigation/bottom-tabs').BottomTabNavigationProp<BottomTabParamList, 'Gift'>;
  route: import('@react-navigation/native').RouteProp<BottomTabParamList, 'Gift'>;
};

export type CartScreenProps = {
  navigation: import('@react-navigation/bottom-tabs').BottomTabNavigationProp<BottomTabParamList, 'Cart'>;
  route: import('@react-navigation/native').RouteProp<BottomTabParamList, 'Cart'>;
};

// Note: SignUp route does not accept params
