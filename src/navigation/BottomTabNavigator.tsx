import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import AppText from '../components/ui/AppText';
import { ICONS } from '../assests';
import FastImage from 'react-native-fast-image';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import PromosScreen from '../screens/promos/PromosScreen';
import ServiceScreen from '../screens/service/ServiceScreen';
import GiftScreen from '../screens/gift/GiftScreen';
import CartScreen from '../screens/cart/CartScreen';

// Navigation types
export type BottomTabParamList = {
  Home: undefined;
  Promos: undefined;
  Service: undefined;
  Gift: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Tab Icons
const TAB_ICONS: Record<keyof BottomTabParamList, number> = {
  Home: ICONS.Home,
  Promos: ICONS.Promos,
  Service: ICONS.Service,
  Gift: ICONS.Gift,
  Cart: ICONS.Cart,
};

const TAB_LABELS: Record<keyof BottomTabParamList, string> = {
  Home: 'Home',
  Promos: 'Promos',
  Service: 'Service',
  Gift: 'Gift',
  Cart: 'Cart',
};

// Custom Tab Bar Component
const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.whiteBackground || '#FFFFFF',
          paddingTop: spacing.sm || 8,
          paddingBottom: spacing.md || 16,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tabName = route.name as keyof BottomTabParamList;
        const isCart = tabName === 'Cart';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel || TAB_LABELS[tabName]}
            testID={`tab-${tabName}`}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              {
                paddingVertical: spacing.xs || 4,
                paddingHorizontal: spacing.xs || 4,
                borderRadius: borderRadius.sm || 4,
              },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <FastImage
                style={{ width: 24, height: 24 }}
                source={TAB_ICONS[tabName]}
                resizeMode="contain"
                tintColor={isFocused ? colors.primary || '#FF6B35' : colors.greyText || '#666666'}
              />
              {/* Cart badge - TODO: Get from cart store/context */}
              {isCart && false && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.error || '#FF4444',
                      minWidth: 18,
                      height: 18,
                      borderRadius: 9,
                    },
                  ]}
                >
                  <AppText
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: colors.whiteText || '#FFFFFF',
                    }}
                  >
                    {/* TODO: Replace with actual cart count */}
                    0
                  </AppText>
                </View>
              )}
            </View>
            <AppText
              style={{
                fontSize: 12,
                fontWeight: isFocused ? '600' : '400',
                color: isFocused
                  ? colors.primary || '#FF6B35'
                  : colors.greyText || '#666666',
                marginTop: spacing.xs || 4,
              }}
            >
              {TAB_LABELS[tabName]}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: TAB_LABELS.Home,
        }}
      />
      <Tab.Screen 
        name="Promos" 
        component={PromosScreen}
        options={{
          tabBarLabel: TAB_LABELS.Promos,
        }}
      />
      <Tab.Screen 
        name="Service" 
        component={ServiceScreen}
        options={{
          tabBarLabel: TAB_LABELS.Service,
        }}
      />
      <Tab.Screen 
        name="Gift" 
        component={GiftScreen}
        options={{
          tabBarLabel: TAB_LABELS.Gift,
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          tabBarLabel: TAB_LABELS.Cart,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 90 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default BottomTabNavigator;

