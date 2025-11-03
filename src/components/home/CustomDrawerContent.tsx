import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';
import AppText from '../ui/AppText';
import { DrawerItem } from '../../types/home';
import createStyles from './CustomDrawerContent.styles';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  user,
  navigation,
  ...props
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const { logout } = useAuth();

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  // Drawer Items
  const drawerItems: DrawerItem[] = [
    {
      id: 'profile',
      label: 'My Profile',
      iconName: '👤',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Profile', 'Profile screen coming soon!');
      },
    },
    {
      id: 'orders',
      label: 'My Orders',
      iconName: '📦',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Orders', 'Orders screen coming soon!');
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      iconName: '⚙️',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Settings', 'Settings screen coming soon!');
      },
    },
    { id: 'divider', label: '', onPress: () => {}, divider: true },
    {
      id: 'logout',
      label: 'Sign Out',
      iconName: '🚪',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        logout();
        const rootNavigation = navigation.getParent();
        if (rootNavigation) {
          rootNavigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' as never }],
          });
        }
      },
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainer}
    >
      {/* User Info Section */}
      {user && (
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <AppText style={styles.avatarIcon}>👤</AppText>
          </View>
          {user.name && (
            <AppText style={styles.userName}>
              {user.name}
            </AppText>
          )}
          {user.email && (
            <AppText style={styles.userEmail}>
              {user.email}
            </AppText>
          )}
        </View>
      )}

      {/* Drawer Items */}
      <View style={styles.itemsContainer}>
        {drawerItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.divider && index > 0 && (
              <View style={styles.divider} />
            )}
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.drawerItem}
              activeOpacity={0.7}
            >
              {item.iconName && (
                <AppText style={styles.drawerItemIcon}>
                  {item.iconName}
                </AppText>
              )}
              <AppText style={styles.drawerItemLabel}>
                {item.label}
              </AppText>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

