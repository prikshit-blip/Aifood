import React, { Suspense, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import {
  AppBar,
  MenuHeader,
  CategoryHeader,
  ProductList,
  FloatingSearchButton,
} from '../../components/home';
import ErrorBoundary from 'react-native-error-boundary';
import AppText from '../../components/ui/AppText';
import {
  HomeScreenState,
  MenuItem as HomeMenuItem,
  CategoryItem,
  Product,
} from '../../types/home';
import createStyles from './styles';
import { CategoryErrorFallback } from '../../components/ErrorBoundary';
import { useStoreMenu } from '../../api/menu/useMenu';
import type { MenuItem as ApiMenuItem, MenuCategory } from '../../api/menu/menuApi';
import ShimmerHeader from '../../components/ui/ShimmerHeader';

type HomeScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { user, logout } = useAuth();
  const { openDrawer } = useDrawerNavigation();

  // ========== State Management ==========
  const [state, setState] = useState<Omit<HomeScreenState, 'activeTab' | 'isDrawerOpen'>>({
    selectedMenuId: null,
    selectedCategoryId: null,
    products: [],
    isLoading: false,
    favoriteProducts: [],
  });

  // ========== Fetch Menu Data from API ==========
  const { data: menuData, isLoading: isLoadingMenu, error: menuError } = useStoreMenu();

  // ========== Transform API Data to Component Types ==========
  const menuItems: HomeMenuItem[] = useMemo(() => {
    if (!menuData?.menus) return [];
    
    // Sort menus by sequence_id
    const sortedMenus = [...menuData.menus].sort((a, b) => a.menu_sequence_id - b.menu_sequence_id);
    
    return sortedMenus.map((menu: ApiMenuItem) => ({
      id: menu.menu_id.toString(),
      label: menu.menu_name,
      value: menu.menu_id.toString(),
    }));
  }, [menuData]);

  const categoryItems: CategoryItem[] = useMemo(() => {
    if (!state.selectedMenuId || !menuData?.menus) return [];
    
    // Find selected menu
    const selectedMenu = menuData.menus.find(
      (menu: ApiMenuItem) => menu.menu_id.toString() === state.selectedMenuId
    );
    
    if (!selectedMenu?.categories) return [];
    
    // Sort categories by sequence_id
    const sortedCategories = [...selectedMenu.categories].sort(
      (a, b) => a.category_sequence_id - b.category_sequence_id
    );
    
    return sortedCategories.map((category: MenuCategory) => ({
      id: category.category_id.toString(),
      label: category.category_name,
    }));
  }, [menuData, state.selectedMenuId]);

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
        selectedMenuId: menuItems[0]?.id || null, // Default to first menu
      }));
    }
  }, [menuItems, state.selectedMenuId]);

  React.useEffect(() => {
    if (categoryItems.length > 0 && !state.selectedCategoryId) {
      setState((prev) => ({
        ...prev,
        selectedCategoryId: categoryItems[0]?.id || null, // Default to first category
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
    setState((prev) => ({ 
      ...prev, 
      selectedMenuId: itemId,
      selectedCategoryId: null, // Reset category when menu changes
    }));
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setState((prev) => ({ ...prev, selectedCategoryId: categoryId }));
  }, []);

  const handleDrawerOpen = useCallback(() => {
    openDrawer();
  }, [openDrawer]);

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



  // ========== Error Fallback Component ==========
  const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
    const { colors, spacing, borderRadius } = useTheme();
    const errorStyles = useMemo(
      () => createStyles(colors, spacing, borderRadius),
      [colors, spacing, borderRadius]
    );
    
    if (!colors || !spacing || !borderRadius) {
      return null;
    }

    return (
      <View style={errorStyles.errorContainer}>
        <AppText style={errorStyles.errorHeader}>
          ⚠️ Something went wrong
        </AppText>
        <AppText style={errorStyles.errorMessage}>
          {error?.message || 'An unexpected error occurred in ProductList'}
        </AppText>
        <TouchableOpacity
          style={errorStyles.errorButton}
          onPress={resetError}
        >
          <AppText style={errorStyles.errorButtonText}>
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

  // Show loading state while fetching menu data
  // if (isLoadingMenu) {
  //   return (
  //     <SafeAreaView
  //       edges={['top']}
  //       style={[styles.container, { backgroundColor: colors.whiteBackground || '#FFFFFF', justifyContent: 'center', alignItems: 'center' }]}
  //     >
  //       <AppText style={{ fontSize: 16, color: colors.greyText }}>Loading menu...</AppText>
  //     </SafeAreaView>
  //   );
  // }

  // Show error state if menu fetch failed
  if (menuError) {
    return (
      <SafeAreaView
        edges={['top']}
        style={styles.menuErrorContainer}
      >
        <AppText style={styles.menuErrorText}>
          Failed to load menu. Please try again.
        </AppText>
        <TouchableOpacity
          style={styles.menuErrorButton}
          onPress={() => {
            Alert.alert('Info', 'Please refresh the app');
          }}
        >
          <AppText style={styles.menuErrorButtonText}>
            OK
          </AppText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      {/* App Bar */}
      <AppBar
        onMenuPress={handleDrawerOpen}
        onNotificationPress={handleNotificationPress}
        hasNotifications={true}
      />

      {/* Menu Header */}
      <ErrorBoundary
        onError={(error: Error, stackTrace: string) => {
          console.error('🛡️ ErrorBoundary caught error in MenuHeader:', error, stackTrace);
        }}
        FallbackComponent={CategoryErrorFallback}
      >
        <Suspense fallback={<ShimmerHeader itemCount={4} itemWidth={120} itemHeight={40} />}>
          <MenuHeader
            items={menuItems}
            selectedItemId={state.selectedMenuId || undefined}
            onItemSelect={handleMenuSelect}
            loading={isLoadingMenu}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Category Header - Wrapped with Error Boundary */}
      <ErrorBoundary
        onError={(error: Error, stackTrace: string) => {
          console.error('🛡️ ErrorBoundary caught error in CategoryHeader:', error, stackTrace);
        }}
        FallbackComponent={CategoryErrorFallback}
      >
        <Suspense fallback={<ShimmerHeader itemCount={5} itemWidth={100} itemHeight={36} />}>
          <CategoryHeader
            categories={categoryItems}
            selectedCategoryId={state.selectedCategoryId || undefined}
            onCategorySelect={handleCategorySelect}
            loading={isLoadingMenu}
          />
        </Suspense>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
