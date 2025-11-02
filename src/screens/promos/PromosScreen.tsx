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

type PromosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const PromosScreen: React.FC = () => {
  const navigation = useNavigation<PromosScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = React.useState<TabItem>('Promos');
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
    // Navigate back to HomeScreen if not already there, or handle tab switching
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

  // Mock promo data
  const promos = [
    {
      id: '1',
      title: 'Summer Special',
      description: 'Get 20% off on all items',
      discount: '20% OFF',
      validUntil: 'Valid until Dec 31, 2024',
    },
    {
      id: '2',
      title: 'Weekend Deal',
      description: 'Buy 2 Get 1 Free',
      discount: 'B2G1',
      validUntil: 'Valid until Dec 31, 2024',
    },
    {
      id: '3',
      title: 'First Order Bonus',
      description: 'Special discount for first-time customers',
      discount: '15% OFF',
      validUntil: 'Valid until Dec 31, 2024',
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
            Promos & Offers
          </AppText>
          <AppText
            style={{
              fontSize: 14,
              color: colors.greyText || '#666666',
              marginTop: spacing.xs || 4,
            }}
          >
            Discover amazing deals and discounts
          </AppText>
        </View>

        {promos.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            style={[
              styles.promoCard,
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
            onPress={() => Alert.alert('Promo', `Applying ${promo.title}`)}
          >
            <View style={styles.promoHeader}>
              <View style={styles.promoInfo}>
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: colors.primaryText || '#000000',
                  }}
                >
                  {promo.title}
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.greyText || '#666666',
                    marginTop: spacing.xs || 4,
                  }}
                >
                  {promo.description}
                </AppText>
              </View>
              <View
                style={[
                  styles.discountBadge,
                  {
                    backgroundColor: colors.primary || '#FF6B35',
                    borderRadius: borderRadius.md || 8,
                    paddingHorizontal: spacing.md || 12,
                    paddingVertical: spacing.sm || 8,
                  },
                ]}
              >
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: colors.whiteText || '#FFFFFF',
                  }}
                >
                  {promo.discount}
                </AppText>
              </View>
            </View>
            <AppText
              style={{
                fontSize: 12,
                color: colors.greyText || '#999999',
                marginTop: spacing.md || 12,
              }}
            >
              {promo.validUntil}
            </AppText>
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

export default PromosScreen;

