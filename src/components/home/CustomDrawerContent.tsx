import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
      contentContainerStyle={{
        flex: 1,
        paddingTop: spacing.xl || 40,
        paddingHorizontal: spacing.lg || 20,
      }}
    >
      {/* User Info Section */}
      {user && (
        <View
          style={[
            styles.userSection,
            {
              paddingBottom: spacing.lg || 20,
              marginBottom: spacing.lg || 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.greyBackground || '#F5F5F5',
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.secondaryBackground || '#FFF5F0',
              },
            ]}
          >
            <AppText style={{ fontSize: 24 }}>👤</AppText>
          </View>
          {user.name && (
            <AppText
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.primaryText || '#000000',
                marginTop: spacing.sm || 8,
              }}
            >
              {user.name}
            </AppText>
          )}
          {user.email && (
            <AppText
              style={{
                fontSize: 14,
                color: colors.greyText || '#666666',
                marginTop: spacing.xs || 4,
              }}
            >
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
              <View
                style={[
                  styles.divider,
                  {
                    backgroundColor: colors.greyBackground || '#F5F5F5',
                    marginVertical: spacing.md || 16,
                  },
                ]}
              />
            )}
            <TouchableOpacity
              onPress={item.onPress}
              style={[
                styles.drawerItem,
                {
                  paddingVertical: spacing.md || 16,
                  borderRadius: borderRadius.sm || 8,
                },
              ]}
              activeOpacity={0.7}
            >
              {item.iconName && (
                <AppText style={{ fontSize: 20, marginRight: spacing.md || 16 }}>
                  {item.iconName}
                </AppText>
              )}
              <AppText
                style={{
                  fontSize: 16,
                  color: colors.primaryText || '#000000',
                }}
              >
                {item.label}
              </AppText>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});

export default CustomDrawerContent;

