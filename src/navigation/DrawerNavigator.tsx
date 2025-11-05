import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../components/home/CustomDrawerContent';

// Navigation types
export type DrawerParamList = {
  MainTabs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const { user } = useAuth();

  console.log('user DrawerNavigator', user);

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          user={
            user
              ? {
                  name: user.firstName || user.email || 'User',
                  email: user.email || undefined,
                  avatarUrl: undefined,
                }
              : undefined
          }
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'front', // Drawer opens over content instead of sliding it
        drawerStyle: {
          width: 280,
          backgroundColor: colors.whiteBackground || '#FFFFFF',
        },
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        drawerActiveTintColor: colors.primary || '#FF6B35',
        drawerInactiveTintColor: colors.greyText || '#666666',
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Main',
          drawerItemStyle: { display: 'none' }, // Hide from drawer menu since we're using bottom tabs
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

