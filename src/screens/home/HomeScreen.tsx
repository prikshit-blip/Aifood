import React, { Suspense, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import NotificationModal from '../notifications/NotificationModal';
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
import { useStoreProducts } from '../../api/products/useProducts';
import type { Product as ApiProduct, ProductApiResponse } from '../../api/products/productApi';

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

  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  // ========== Fetch Menu Data from API ==========
  const { data: menuData, isLoading: isLoadingMenu, error: menuError } = useStoreMenu();
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useStoreProducts();
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

  // ========== Transform API Products to Component Products ==========
  const transformedProducts: Product[] = useMemo(() => {
    // Handle response structure - could be direct or wrapped in data
    const categories = productsData?.categories || (productsData as any)?.data?.categories;
    if (!categories) return [];

    const allProducts: Product[] = [];

    // Iterate through all categories and their products
    Object.entries(categories).forEach(([categoryId, apiProducts]) => {
      const products = apiProducts as ApiProduct[];
      products.forEach((apiProduct: ApiProduct) => {
        // Extract tag IDs from tags array
        const tagIds = apiProduct.tags?.map((tag) => tag.tag_id) || [];

        allProducts.push({
          id: apiProduct.product_id.toString(),
          title: apiProduct.product_name || 'Untitled Product',
          subHeading: apiProduct.product_subtitle || undefined,
          description: apiProduct.product_subtitle || '',
          price: apiProduct.price || 0,
          imageUrl: apiProduct.image_url || undefined,
          imageUri: apiProduct.image_url || undefined,
          dietaryInfo: {
            // You can map tags to dietary info if needed
            isVegetarian: tagIds.includes(5) || false, // Example: tag_id 5 might be vegetarian
            isVegan: tagIds.includes(6) || false, // Example: tag_id 6 might be vegan
            isGlutenFree: false,
            allergens: [],
          },
          isPopular: false, // Can be determined from tags or other fields
          isFavorite: state.favoriteProducts.includes(apiProduct.product_id.toString()),
          tags: tagIds.map((id) => id.toString()),
          inStock: apiProduct.stock_status !== false, // null or true means in stock
          availableQuantity: undefined,
          // Store category_id for filtering (will be used internally)
          categoryId: parseInt(categoryId, 10),
          menuId: undefined,
        } as Product & { categoryId: number; menuId?: number });
      });
    });

    return allProducts;
  }, [productsData, state.favoriteProducts]);

  // ========== Filter Products by Category ==========
  const filteredProducts: Product[] = useMemo(() => {
    // Handle response structure - could be direct or wrapped in data
    const categories = productsData?.categories || (productsData as any)?.data?.categories;
    
    if (!state.selectedCategoryId || !categories) {
      return transformedProducts;
    }

    const selectedCategoryIdStr = state.selectedCategoryId;
    const categoryProducts = categories[selectedCategoryIdStr] || [];

    // Transform products for the selected category
    return categoryProducts.map((apiProduct: ApiProduct) => {
      const tagIds = apiProduct.tags?.map((tag) => tag.tag_id) || [];

      return {
        id: apiProduct.product_id.toString(),
        title: apiProduct.product_name || 'Untitled Product',
        subHeading: apiProduct.product_subtitle || undefined,
        description: apiProduct.product_subtitle || '',
        price: apiProduct.price || 0,
        imageUrl: apiProduct.image_url || undefined,
        imageUri: apiProduct.image_url || undefined,
        dietaryInfo: {
          isVegetarian: tagIds.includes(5) || false,
          isVegan: tagIds.includes(6) || false,
          isGlutenFree: false,
          allergens: [],
        },
        isPopular: false,
        isFavorite: state.favoriteProducts.includes(apiProduct.product_id.toString()),
        tags: tagIds.map((id) => id.toString()),
        inStock: apiProduct.stock_status !== false,
        availableQuantity: undefined,
        categoryId: parseInt(selectedCategoryIdStr, 10),
        menuId: undefined,
      } as Product & { categoryId: number; menuId?: number };
    });
  }, [productsData, state.selectedCategoryId, state.favoriteProducts]);

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

  // Update products when filtered products change
  React.useEffect(() => {
    setState((prev) => ({
      ...prev,
      products: filteredProducts,
      isLoading: isLoadingProducts,
    }));
  }, [filteredProducts, isLoadingProducts]);

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
    setIsNotificationModalVisible(true);
  }, []);

  const handleNotificationModalClose = useCallback(() => {
    setIsNotificationModalVisible(false);
  }, []);

  const handleNotificationItemPress = useCallback((notification: any) => {
    // Handle notification item press
    console.log('Notification pressed:', notification);
    // You can navigate to order details, promo details, etc. based on notification type
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

      {/* Notification Modal */}
      <NotificationModal
        isVisible={isNotificationModalVisible}
        onClose={handleNotificationModalClose}
        onNotificationPress={handleNotificationItemPress}
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
          products={filteredProducts}
          onProductPress={handleProductPress}
          onFavoriteToggle={handleFavoriteToggle}
          loading={isLoadingProducts || isLoadingMenu}
          emptyMessage={
            state.selectedCategoryId
              ? 'No products available for this category'
              : 'No products available'
          }
        />
      </ErrorBoundary>

      {/* Floating Search Button */}
      <FloatingSearchButton onPress={handleSearchPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;
