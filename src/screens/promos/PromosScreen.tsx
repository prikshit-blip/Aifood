import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  AppBar,
} from '../../components/home';
import AppText from '../../components/ui/AppText';
import createStyles from './styles';

type PromosScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Promos'>;

interface Promo {
  id: string;
  title: string;
  description: string;
  discount?: string;
  imageUrl?: string;
  validUntil?: string;
  code?: string;
}

const PromosScreen: React.FC = () => {
  const navigation = useNavigation<PromosScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();

  // No local state needed for drawer

  // Mock promo data
  const promos: Promo[] = useMemo(
    () => [
      {
        id: '1',
        title: '50% Off on All Burgers',
        description: 'Get 50% discount on all burger items. Valid until end of month.',
        discount: '50% OFF',
        validUntil: '2024-12-31',
        code: 'BURGER50',
      },
      {
        id: '2',
        title: 'Free Delivery',
        description: 'Free delivery on orders above $50. Use code at checkout.',
        discount: 'FREE',
        validUntil: '2024-12-31',
        code: 'FREEDEL',
      },
      {
        id: '3',
        title: 'Buy 2 Get 1 Free',
        description: 'Buy any 2 items and get 1 free. Limited time offer!',
        discount: 'B2G1',
        validUntil: '2024-12-31',
        code: 'B2G1FREE',
      },
      {
        id: '4',
        title: 'Weekend Special',
        description: '20% off on weekends. Every Saturday and Sunday.',
        discount: '20% OFF',
        validUntil: '2024-12-31',
        code: 'WEEKEND20',
      },
    ],
    []
  );

  // ========== Handlers ==========
  const handleDrawerOpen = useCallback(() => {
    const rootNavigation = navigation.getParent()?.getParent();
    if (rootNavigation) {
      rootNavigation.dispatch(DrawerActions.openDrawer());
    }
  }, [navigation]);

  const handleNotificationPress = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications');
  }, []);

  const handlePromoPress = useCallback((promo: Promo) => {
    Alert.alert('Promo Code', `Code: ${promo.code || 'N/A'}\n\n${promo.description}`);
  }, []);

  // ========== Styles ==========
  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.whiteBackground || '#FFFFFF' }]}
    >
      {/* App Bar */}
      <AppBar
        onMenuPress={handleDrawerOpen}
        onNotificationPress={handleNotificationPress}
        hasNotifications={true}
      />

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing.md || 16,
          paddingBottom: 100, // Space for bottom tab
        }}
        showsVerticalScrollIndicator={false}
      >
        <AppText
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.primaryText || '#000000',
            marginBottom: spacing.lg || 24,
          }}
        >
          Promotions & Offers
        </AppText>

        {promos.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            onPress={() => handlePromoPress(promo)}
            style={[
              {
                backgroundColor: colors.whiteBackground || '#FFFFFF',
                borderRadius: borderRadius.md || 12,
                padding: spacing.md || 16,
                marginBottom: spacing.md || 16,
                borderWidth: 1,
                borderColor: colors.greyBackground || '#F5F5F5',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              },
            ]}
            activeOpacity={0.7}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.sm || 8,
              }}
            >
              <AppText
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.primaryText || '#000000',
                  flex: 1,
                }}
              >
                {promo.title}
              </AppText>
              {promo.discount && (
                <View
                  style={{
                    backgroundColor: colors.primary || '#FF6B35',
                    paddingHorizontal: spacing.sm || 12,
                    paddingVertical: spacing.xs || 6,
                    borderRadius: borderRadius.sm || 6,
                  }}
                >
                  <AppText
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: colors.whiteText || '#FFFFFF',
                    }}
                  >
                    {promo.discount}
                  </AppText>
                </View>
              )}
            </View>

            <AppText
              style={{
                fontSize: 14,
                color: colors.greyText || '#666666',
                marginBottom: spacing.sm || 8,
              }}
            >
              {promo.description}
            </AppText>

            {promo.code && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: spacing.xs || 4,
                }}
              >
                <AppText
                  style={{
                    fontSize: 12,
                    color: colors.greyText || '#666666',
                    marginRight: spacing.xs || 4,
                  }}
                >
                  Code:
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.primary || '#FF6B35',
                  }}
                >
                  {promo.code}
                </AppText>
              </View>
            )}

            {promo.validUntil && (
              <AppText
                style={{
                  fontSize: 11,
                  color: colors.greyText || '#999999',
                  marginTop: spacing.xs || 4,
                }}
              >
                Valid until: {promo.validUntil}
              </AppText>
            )}
          </TouchableOpacity>
        ))}

        {promos.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: spacing.xl || 40,
            }}
          >
            <AppText
              style={{
                fontSize: 16,
                color: colors.greyText || '#666666',
                textAlign: 'center',
              }}
            >
              No promotions available at the moment
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromosScreen;

