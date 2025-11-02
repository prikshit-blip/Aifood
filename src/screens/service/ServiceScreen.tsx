import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { AppBar, BottomTabNavigator, Drawer } from '../../components/home';
import { TabItem, DrawerItem } from '../../types/home';
import AppText from '../../components/ui/AppText';
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import createStyles from './styles';

type ServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ServiceScreen: React.FC = () => {
  const navigation = useNavigation<ServiceScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = React.useState<TabItem>('Service');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleDrawerClose = React.useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleNotificationPress = React.useCallback(() => {
    Alert.alert('Notifications', 'No new notifications');
  }, []);

  const handleTabPress = React.useCallback((tab: TabItem) => {
    setActiveTab(tab);
  }, []);

  const handleSignOut = React.useCallback(() => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  }, [logout, navigation]);

  const drawerItems: DrawerItem[] = React.useMemo(
    () => [
      {
        id: 'profile',
        label: 'My Profile',
        iconName: '👤',
        onPress: () => Alert.alert('Profile', 'Profile screen coming soon!'),
      },
      {
        id: 'orders',
        label: 'My Orders',
        iconName: '📦',
        onPress: () => Alert.alert('Orders', 'Orders screen coming soon!'),
      },
      {
        id: 'settings',
        label: 'Settings',
        iconName: '⚙️',
        onPress: () => Alert.alert('Settings', 'Settings screen coming soon!'),
      },
      { id: 'divider', label: '', onPress: () => {}, divider: true },
      {
        id: 'logout',
        label: 'Sign Out',
        iconName: '🚪',
        onPress: handleSignOut,
      },
    ],
    [handleSignOut]
  );

  const styles = React.useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  // Mock service data
  const services = [
    {
      id: '1',
      title: 'Table Reservation',
      description: 'Book a table in advance',
      icon: '🍽️',
    },
    {
      id: '2',
      title: 'Catering Service',
      description: 'Order catering for events',
      icon: '🎉',
    },
    {
      id: '3',
      title: 'Delivery',
      description: 'Fast and reliable delivery',
      icon: '🚚',
    },
    {
      id: '4',
      title: 'Customer Support',
      description: '24/7 customer support',
      icon: '💬',
    },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.whiteBackground || '#FFFFFF' }]}
    >
      <AppBar
        onMenuPress={handleDrawerOpen}
        onNotificationPress={handleNotificationPress}
        hasNotifications={true}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing.md || 16, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { marginTop: spacing.md || 16, marginBottom: spacing.lg || 24 }]}>
          <AppText
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.primaryText || '#000000',
            }}
          >
            Services
          </AppText>
          <AppText
            style={{
              fontSize: 14,
              color: colors.greyText || '#666666',
              marginTop: spacing.xs || 4,
            }}
          >
            Explore our range of services
          </AppText>
        </View>

        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              {
                backgroundColor: colors.whiteBackground || '#FFFFFF',
                borderRadius: borderRadius.lg || 12,
                padding: spacing.lg || 20,
                marginBottom: spacing.md || 16,
                borderWidth: 1,
                borderColor: colors.greyBackground || '#F5F5F5',
              },
            ]}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Service', `Opening ${service.title}`)}
          >
            <View style={styles.serviceContent}>
              <View
                style={[
                  styles.serviceIcon,
                  {
                    backgroundColor: colors.greyBackground || '#F5F5F5',
                    borderRadius: borderRadius.md || 8,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md || 16,
                  },
                ]}
              >
                <AppText style={{ fontSize: 32 }}>{service.icon}</AppText>
              </View>
              <View style={styles.serviceInfo}>
                <AppText
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.primaryText || '#000000',
                  }}
                >
                  {service.title}
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.greyText || '#666666',
                    marginTop: spacing.xs || 4,
                  }}
                >
                  {service.description}
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        cartItemCount={0}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        items={drawerItems}
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
    </SafeAreaView>
  );
};

export default ServiceScreen;

