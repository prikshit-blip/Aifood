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
import AppButton from '../ui/AppButton';
import createStyles from './CustomDrawerContent.styles';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  user={},
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

  const isLoggedIn = user?.name;
  console.log('isLoggedIn user' , isLoggedIn);

  // Common menu items for both logged in and guest
  const commonMenuItems = [
    {
      id: 'notifications',
      label: 'Notifications',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Notifications', 'Notifications screen coming soon!');
      },
    },
    {
      id: 'orders',
      label: 'My Orders',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('My Orders', 'Orders screen coming soon!');
      },
    },
    {
      id: 'booking',
      label: 'My Booking',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('My Booking', 'Booking screen coming soon!');
      },
    },
    {
      id: 'giftCards',
      label: 'Gift Cards',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        // Navigate to Gift tab - drawer is already inside MainTabs
        try {
          const tabsNavigation = navigation.getParent();
          if (tabsNavigation) {
            (tabsNavigation as any).navigate('Gift');
          }
        } catch (error) {
          Alert.alert('Gift Cards', 'Gift Cards screen coming soon!');
        }
      },
    },
    {
      id: 'favourites',
      label: 'Favourites',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Favourites', 'Favourites screen coming soon!');
      },
    },
    {
      id: 'browseStores',
      label: 'Browse Stores',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Browse Stores', 'Browse Stores screen coming soon!');
      },
    },
    {
      id: 'changeLanguage',
      label: 'Change Language',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Change Language', 'Language settings coming soon!');
      },
    },
    {
      id: 'privacyPolicy',
      label: 'Privacy Policy',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Privacy Policy', 'Privacy Policy screen coming soon!');
      },
    },
    {
      id: 'termsConditions',
      label: 'Terms and Conditions',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Terms and Conditions', 'Terms screen coming soon!');
      },
    },
  ];

  // Menu items for logged in users (includes additional items)
  const loggedInMenuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('My Profile', 'Profile screen coming soon!');
      },
    },
    {
      id: 'ageVerification',
      label: 'Age Verification',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert('Age Verification', 'Age Verification screen coming soon!');
      },
    },
    ...commonMenuItems,
    {
      id: 'deleteAccount',
      label: 'Delete Account',
      onPress: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.'),
            },
          ]
        );
      },
    },
  ];

  const handleSignUp = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('SignUp' as never);
    }
  };

  const handleLogin = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.navigate('SignIn' as never);
    }
  };

  const handleLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    logout();
    const rootNavigation = navigation.getParent();
    if (rootNavigation) {
      rootNavigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' as never }],
      });
    }
  };

  const menuItems = isLoggedIn ? loggedInMenuItems : commonMenuItems;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        {/* User/Guest Info Section */}
        <View style={styles.headerSection}>
          {isLoggedIn ? (
            <AppText style={styles.userName}>
              {user.name || 'User'}
            </AppText>
          ) : (
            <View style={styles.guestSection}>
              <AppText color={colors?.normalText} style={styles.guestLabel}>Guest</AppText>
              {/* <View style={styles.guestUnderline} /> */}
            </View>
          )}
        </View>

        {/* Drawer Items */}
        <View style={styles.itemsContainer}>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.drawerItem}
                activeOpacity={0.7}
              >
                <AppText style={styles.drawerItemLabel}>
                  {item.label}
                </AppText>
              </TouchableOpacity>
              <View style={styles.divider} />
            </React.Fragment>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {isLoggedIn ? (
          <AppButton
            title="LOG OUT"
            onPress={handleLogout}
            variant="secondary"
            // style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        ) : (
          <View style={styles.authButtonContainer}>
            <AppButton
              title="SIGN UP"
              onPress={handleSignUp}
              variant="secondary"
              // style={styles.authButton}
              // textStyle={styles.authButtonText}
            />
            <AppButton
              title="LOGIN"
              onPress={handleLogin}
              variant="secondary"
              // style={styles.authButton}
              // textStyle={styles.authButtonText}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDrawerContent;

