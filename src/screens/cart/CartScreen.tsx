import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../../components/ui/AppText';
import ScreenHeader from '../../components/ui/ScreenHeader';
import {
  Product,
} from '../../types/home';
import createStyles from './styles';
import AppImage from '../../components/ui/AppImage';
import { IMAGES } from '../../assests';

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
      style={styles.container}
    >
      {/* Screen Header */}
      <ScreenHeader title="Cart" />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.EmptyCartContainer}>
          {/* <AppImage 
          source={IMAGES.placholder}
          style={styles.placholderImage}
          /> */}
          <View style={styles.cartItemDetails}>
            <AppText style={styles.cartItemTitle}>
              No items in cart
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button - Fixed at bottom */}
      {/* {cartItems.length > 0 && (
        <View style={styles.checkoutButtonContainer}>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.checkoutButton}
          >
            <AppText style={styles.checkoutButtonText}>
              Proceed to Checkout
            </AppText>
          </TouchableOpacity>
        </View>
      )} */}
    </SafeAreaView>
  );
};

export default CartScreen;

