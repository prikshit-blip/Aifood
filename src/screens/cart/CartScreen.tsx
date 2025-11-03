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
import {
  Product,
} from '../../types/home';
import createStyles from './styles';

type CartScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Cart'>;

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();

  const [state, setState] = useState({
    cartItems: [] as CartItem[],
  });

  // Mock cart data
  const cartItems: CartItem[] = useMemo(
    () => [
      {
        id: '1',
        product: {
          id: '1',
          title: 'Veg Farm Fresh Burger',
          subHeading: 'Sub Heading',
          description: 'Cherry tomatoes, artich and...',
          price: 28.0,
          isPopular: true,
          isFavorite: false,
          dietaryInfo: {
            isVegetarian: true,
            isVegan: false,
          },
          inStock: true,
        },
        quantity: 2,
        subtotal: 56.0,
      },
      {
        id: '2',
        product: {
          id: '2',
          title: 'Chicken Deluxe Burger',
          subHeading: 'Sub Heading',
          description: 'Grilled chicken with special sauce...',
          price: 32.0,
          isPopular: false,
          isFavorite: true,
          dietaryInfo: {
            isVegetarian: false,
            isVegan: false,
          },
          inStock: true,
        },
        quantity: 1,
        subtotal: 32.0,
      },
    ],
    []
  );

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

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

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setState((prev) => ({
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== itemId),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                subtotal: item.product.price * newQuantity,
              }
            : item
        ),
      }));
    }
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setState((prev) => ({
              ...prev,
              cartItems: prev.cartItems.filter((item) => item.id !== itemId),
            }));
          },
        },
      ]
    );
  }, []);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items to proceed.');
      return;
    }
    Alert.alert('Checkout', `Proceed with checkout for $${cartTotal.toFixed(2)}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Proceed',
        onPress: () => Alert.alert('Success', 'Checkout initiated!'),
      },
    ]);
  }, [cartItems, cartTotal]);

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
          paddingBottom: 160, // Space for bottom tab and checkout button
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
          Your Cart
        </AppText>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <View
                key={item.id}
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
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: spacing.sm || 8,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <AppText
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.primaryText || '#000000',
                        marginBottom: spacing.xs || 4,
                      }}
                    >
                      {item.product.title}
                    </AppText>
                    {item.product.subHeading && (
                      <AppText
                        style={{
                          fontSize: 14,
                          color: colors.greyText || '#666666',
                          marginBottom: spacing.xs || 4,
                        }}
                      >
                        {item.product.subHeading}
                      </AppText>
                    )}
                    <AppText
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: colors.primary || '#FF6B35',
                        marginTop: spacing.xs || 4,
                      }}
                    >
                      ${item.product.price.toFixed(2)}
                    </AppText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={{
                      padding: spacing.xs || 4,
                    }}
                  >
                    <AppText style={{ fontSize: 20 }}>🗑️</AppText>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: spacing.sm || 8,
                    paddingTop: spacing.sm || 8,
                    borderTopWidth: 1,
                    borderTopColor: colors.greyBackground || '#F5F5F5',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.greyBackground || '#F5F5F5',
                      borderRadius: borderRadius.sm || 8,
                      paddingVertical: spacing.xs || 4,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                      style={{
                        paddingHorizontal: spacing.sm || 12,
                        paddingVertical: spacing.xs || 4,
                      }}
                    >
                      <AppText
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: colors.primaryText || '#000000',
                        }}
                      >
                        −
                      </AppText>
                    </TouchableOpacity>
                    <AppText
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: colors.primaryText || '#000000',
                        paddingHorizontal: spacing.md || 16,
                        minWidth: 40,
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </AppText>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                      style={{
                        paddingHorizontal: spacing.sm || 12,
                        paddingVertical: spacing.xs || 4,
                      }}
                    >
                      <AppText
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: colors.primaryText || '#000000',
                        }}
                      >
                        +
                      </AppText>
                    </TouchableOpacity>
                  </View>
                  <AppText
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: colors.primaryText || '#000000',
                    }}
                  >
                    ${item.subtotal.toFixed(2)}
                  </AppText>
                </View>
              </View>
            ))}

            {/* Order Summary */}
            <View
              style={[
                {
                  backgroundColor: colors.whiteBackground || '#FFFFFF',
                  borderRadius: borderRadius.md || 12,
                  padding: spacing.md || 16,
                  marginTop: spacing.md || 16,
                  borderWidth: 1,
                  borderColor: colors.greyBackground || '#F5F5F5',
                },
              ]}
            >
              <AppText
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: colors.primaryText || '#000000',
                  marginBottom: spacing.md || 16,
                }}
              >
                Order Summary
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: spacing.sm || 8,
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.greyText || '#666666',
                  }}
                >
                  Subtotal ({cartItemCount} items)
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.primaryText || '#000000',
                  }}
                >
                  ${cartTotal.toFixed(2)}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: spacing.sm || 8,
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.greyText || '#666666',
                  }}
                >
                  Delivery Fee
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    color: colors.primaryText || '#000000',
                  }}
                >
                  $5.00
                </AppText>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.greyBackground || '#F5F5F5',
                  marginVertical: spacing.sm || 8,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: colors.primaryText || '#000000',
                  }}
                >
                  Total
                </AppText>
                <AppText
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: colors.primary || '#FF6B35',
                  }}
                >
                  ${(cartTotal + 5.0).toFixed(2)}
                </AppText>
              </View>
            </View>
          </>
        ) : (
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
                fontSize: 48,
                marginBottom: spacing.md || 16,
              }}
            >
              🛒
            </AppText>
            <AppText
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.primaryText || '#000000',
                marginBottom: spacing.sm || 8,
                textAlign: 'center',
              }}
            >
              Your cart is empty
            </AppText>
            <AppText
              style={{
                fontSize: 14,
                color: colors.greyText || '#666666',
                textAlign: 'center',
                marginBottom: spacing.lg || 24,
              }}
            >
              Add items to your cart to get started
            </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                backgroundColor: colors.primary || '#FF6B35',
                paddingHorizontal: spacing.lg || 24,
                paddingVertical: spacing.md || 12,
                borderRadius: borderRadius.md || 8,
              }}
            >
              <AppText
                style={{
                  color: colors.whiteText || '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Start Shopping
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button - Fixed at bottom */}
      {cartItems.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            padding: spacing.md || 16,
            backgroundColor: colors.whiteBackground || '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: colors.greyBackground || '#F5F5F5',
          }}
        >
          <TouchableOpacity
            onPress={handleCheckout}
            style={{
              backgroundColor: colors.primary || '#FF6B35',
              paddingVertical: spacing.md || 16,
              borderRadius: borderRadius.md || 8,
              alignItems: 'center',
            }}
          >
            <AppText
              style={{
                color: colors.whiteText || '#FFFFFF',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              Proceed to Checkout
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

