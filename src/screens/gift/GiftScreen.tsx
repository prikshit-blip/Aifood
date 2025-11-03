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

type GiftScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Gift'>;

interface GiftCard {
  id: string;
  title: string;
  description: string;
  value: number;
  imageUrl?: string;
  available: boolean;
}

const GiftScreen: React.FC = () => {
  const navigation = useNavigation<GiftScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();

  // No local state needed for drawer

  // Mock gift card data
  const giftCards: GiftCard[] = useMemo(
    () => [
      {
        id: '1',
        title: '$25 Gift Card',
        description: 'Perfect gift for food lovers. Redeemable on all menu items.',
        value: 25,
        available: true,
      },
      {
        id: '2',
        title: '$50 Gift Card',
        description: 'Great for special occasions. More value, more choices.',
        value: 50,
        available: true,
      },
      {
        id: '3',
        title: '$100 Gift Card',
        description: 'Premium gift card for the ultimate dining experience.',
        value: 100,
        available: true,
      },
      {
        id: '4',
        title: 'Custom Amount',
        description: 'Choose your own gift card amount. Minimum $10.',
        value: 0,
        available: true,
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

  const handleGiftCardPress = useCallback((giftCard: GiftCard) => {
    if (giftCard.available) {
      Alert.alert(
        giftCard.title,
        giftCard.value > 0
          ? `Purchase a $${giftCard.value} gift card?`
          : 'Enter custom amount for gift card?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Purchase',
            onPress: () => Alert.alert('Success', 'Gift card purchase initiated!'),
          },
        ]
      );
    } else {
      Alert.alert('Unavailable', 'This gift card is currently not available.');
    }
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
            marginBottom: spacing.sm || 8,
          }}
        >
          Gift Cards
        </AppText>
        <AppText
          style={{
            fontSize: 14,
            color: colors.greyText || '#666666',
            marginBottom: spacing.lg || 24,
          }}
        >
          Give the gift of great food. Choose a gift card for your loved ones.
        </AppText>

        {giftCards.map((giftCard) => (
          <TouchableOpacity
            key={giftCard.id}
            onPress={() => handleGiftCardPress(giftCard)}
            disabled={!giftCard.available}
            style={[
              {
                backgroundColor: colors.whiteBackground || '#FFFFFF',
                borderRadius: borderRadius.md || 12,
                padding: spacing.md || 16,
                marginBottom: spacing.md || 16,
                borderWidth: 2,
                borderColor: giftCard.available
                  ? colors.primary || '#FF6B35'
                  : colors.greyBackground || '#E0E0E0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                opacity: giftCard.available ? 1 : 0.6,
              },
            ]}
            activeOpacity={0.7}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: colors.primaryText || '#000000',
                    marginBottom: spacing.xs || 4,
                  }}
                >
                  {giftCard.title}
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.greyText || '#666666',
                    marginBottom: spacing.sm || 8,
                  }}
                >
                  {giftCard.description}
                </AppText>
                {!giftCard.available && (
                  <AppText
                    style={{
                      fontSize: 12,
                      color: colors.error || '#FF4444',
                      marginTop: spacing.xs || 4,
                    }}
                  >
                    Currently Unavailable
                  </AppText>
                )}
              </View>
              {giftCard.value > 0 && (
                <View
                  style={{
                    backgroundColor: colors.primary || '#FF6B35',
                    paddingHorizontal: spacing.md || 16,
                    paddingVertical: spacing.sm || 8,
                    borderRadius: borderRadius.sm || 8,
                  }}
                >
                  <AppText
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: colors.whiteText || '#FFFFFF',
                    }}
                  >
                    ${giftCard.value}
                  </AppText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {giftCards.length === 0 && (
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
              No gift cards available at the moment
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GiftScreen;

