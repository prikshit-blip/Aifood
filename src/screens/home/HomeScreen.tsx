import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  AppBar,
  MenuHeader,
  CategoryHeader,
  ProductList,
  BottomTabNavigator,
  FloatingSearchButton,
  Drawer,
} from '../../components/home';
import ErrorBoundary from 'react-native-error-boundary';
import AppText from '../../components/ui/AppText';
import {
  HomeScreenState,
  MenuItem,
  CategoryItem,
  Product,
  TabItem,
  DrawerItem,
} from '../../types/home';
import createStyles from './styles';
import { CategoryErrorFallback } from '../../components/ErrorBoundary';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { user, logout } = useAuth();

  // ========== State Management ==========
  const [state, setState] = useState<HomeScreenState>({
    selectedMenuId: null,
    selectedCategoryId: null,
    products: [],
    isLoading: false,
    isDrawerOpen: false,
    activeTab: 'Home',
    favoriteProducts: [],
  });


  // ========== Mock Data (Replace with API calls) ==========
  const menuItems: MenuItem[] = useMemo(
    () => [
      { id: 'anu', label: 'anu' },
      { id: 'lunch', label: 'Lunch menu' },
      { id: 'dinner', label: 'Dinner menu' },
      { id: 'plick', label: 'Plick' },
    ],
    []
  );

  const categoryItems: CategoryItem[] = useMemo(
    () => [
      { id: 'snacks', label: 'Snacks' },
      { id: 'featured', label: 'Featured Dishes' },
      { id: 'appetizers', label: 'Appetizers' },
      { id: 'main-course', label: 'Main Course' },
      { id: 'desserts', label: 'Desserts' },
    ],
    []
  );

  const mockProducts: Product[] = useMemo(
    () => [
      {
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
      {
        id: '2',
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
      {
        id: '3',
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
      {
        id: '4',
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
      {
        id: '5',
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
      {
        id: '6',
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
    ],
    []
  );

  // ========== Initialize with Default Selected Item ==========
  React.useEffect(() => {
    if (menuItems.length > 0 && !state.selectedMenuId) {
      setState((prev) => ({
        ...prev,
        selectedMenuId: menuItems[1]?.id || menuItems[0]?.id || null, // Default to "Lunch menu"
      }));
    }
  }, [menuItems, state.selectedMenuId]);

  React.useEffect(() => {
    if (categoryItems.length > 0 && !state.selectedCategoryId) {
      setState((prev) => ({
        ...prev,
        selectedCategoryId: categoryItems[0]?.id || null, // Default to "Snacks"
      }));
    }
  }, [categoryItems, state.selectedCategoryId]);

  // Load products when menu or category changes
  React.useEffect(() => {
    if (state.selectedMenuId && state.selectedCategoryId) {
      setState((prev) => ({ ...prev, products: mockProducts, isLoading: false }));
    }
  }, [state.selectedMenuId, state.selectedCategoryId, mockProducts]);

  // ========== Handlers ==========
  const handleMenuSelect = useCallback((itemId: string) => {
    setState((prev) => ({ ...prev, selectedMenuId: itemId }));
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setState((prev) => ({ ...prev, selectedCategoryId: categoryId }));
  }, []);

  const handleDrawerOpen = useCallback(() => {
    setState((prev) => ({ ...prev, isDrawerOpen: true }));
  }, []);

  const handleDrawerClose = useCallback(() => {
    setState((prev) => ({ ...prev, isDrawerOpen: false }));
  }, []);

  const handleNotificationPress = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications');
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    if (!product) return;
    
    try {
      // Navigate to product detail or perform action
      Alert.alert('Product', `Opening ${product.title}`);
      // navigation.navigate('ProductDetail', { productId: product.id });
    } catch (error) {
      // Handle event handler errors
      Alert.alert('Error', 'Failed to open product. Please try again.');
      console.error('Product press error:', error);
    }
  }, []);

  const handleFavoriteToggle = useCallback((productId: string, isFavorite: boolean) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, isFavorite } : p
      ),
      favoriteProducts: isFavorite
        ? [...prev.favoriteProducts, productId]
        : prev.favoriteProducts.filter((id) => id !== productId),
    }));
  }, []);

  const handleSearchPress = useCallback(() => {
    Alert.alert('Search', 'Search functionality coming soon!');
    // navigation.navigate('Search');
  }, []);

  const handleTabPress = useCallback((tab: TabItem) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
    Alert.alert('Tab', `Navigating to ${tab}`);
    // navigation.navigate(tab);
  }, []);

  const handleSignOut = useCallback(() => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  }, [logout, navigation]);

  // ========== Drawer Items ==========
  const drawerItems: DrawerItem[] = useMemo(
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

  // ========== Error Fallback Component ==========
  const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
    const { colors, spacing, borderRadius } = useTheme();
    
    if (!colors || !spacing || !borderRadius) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: spacing.lg || 20,
          backgroundColor: colors.whiteBackground || '#FFFFFF',
        }}
      >
        <AppText
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primaryText || '#000000',
            marginBottom: spacing.md || 12,
            textAlign: 'center',
          }}
        >
          ⚠️ Something went wrong
        </AppText>
        <AppText
          style={{
            fontSize: 16,
            color: colors.greyText || '#666666',
            marginBottom: spacing.md || 8,
            textAlign: 'center',
          }}
        >
          {error?.message || 'An unexpected error occurred in ProductList'}
        </AppText>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary || '#FF6B35',
            paddingHorizontal: spacing.lg || 24,
            paddingVertical: spacing.md || 12,
            borderRadius: borderRadius.md || 8,
            marginTop: spacing.md || 16,
          }}
          onPress={resetError}
        >
          <AppText style={{ color: colors.whiteText || '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
            Try Again
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };

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

      {/* Menu Header */}
      <MenuHeader
        items={menuItems}
        selectedItemId={state.selectedMenuId || undefined}
        onItemSelect={handleMenuSelect}
      />

      {/* Category Header - Wrapped with Error Boundary */}
      <ErrorBoundary
        onError={(error: Error, stackTrace: string) => {
          console.error('🛡️ ErrorBoundary caught error in CategoryHeader:', error, stackTrace);
        }}
        FallbackComponent={CategoryErrorFallback}
      >
        <CategoryHeader
          categories={categoryItems}
          selectedCategoryId={state.selectedCategoryId || undefined}
          onCategorySelect={handleCategorySelect}
        />
      </ErrorBoundary>

      {/* Product List - Wrapped with Error Boundary */}
      <ErrorBoundary
        onError={(error: Error, stackTrace: string) => {
          console.error('ErrorBoundary caught error in ProductList:', error, stackTrace);
          // You can also send error to error reporting service here
        }}
        FallbackComponent={ErrorFallback}
      >
        <ProductList
          products={state.products}
          onProductPress={handleProductPress}
          onFavoriteToggle={handleFavoriteToggle}
          loading={state.isLoading}
          emptyMessage="No products available for this category"
        />
      </ErrorBoundary>

      {/* Floating Search Button */}
      <FloatingSearchButton onPress={handleSearchPress} />

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab={state.activeTab}
        onTabPress={handleTabPress}
        cartItemCount={0}
      />

      {/* Drawer */}
      <Drawer
        isOpen={state.isDrawerOpen}
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

export default HomeScreen;
