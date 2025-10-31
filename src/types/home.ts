/**
 * Types and Interfaces for HomeScreen and related components
 */

// ========== AppBar Types ==========
export interface AppBarProps {
  onMenuPress: () => void;
  onNotificationPress: () => void;
  hasNotifications?: boolean;
}

// ========== Menu Header Types ==========
export interface MenuItem {
  id: string;
  label: string;
  value?: string;
}

export interface MenuHeaderProps {
  items: MenuItem[];
  selectedItemId?: string;
  onItemSelect: (itemId: string) => void;
}

// ========== Category Header Types ==========
export interface CategoryItem {
  id: string;
  label: string;
}

export interface CategoryHeaderProps {
  categories: CategoryItem[];
  selectedCategoryId?: string;
  onCategorySelect: (categoryId: string) => void;
}

// ========== Product Types ==========
export interface DietaryInfo {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  allergens?: string[];
}

export interface Product {
  id: string;
  title: string;
  subHeading?: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageUri?: string;
  dietaryInfo?: DietaryInfo;
  isPopular?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  inStock?: boolean;
  availableQuantity?: number;
}

export interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  onFavoriteToggle?: (productId: string, isFavorite: boolean) => void;
}

export interface ProductListProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onFavoriteToggle?: (productId: string, isFavorite: boolean) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// ========== Bottom Tab Navigator Types ==========
export type TabItem = 'Home' | 'Promos' | 'Service' | 'Gift' | 'Cart';

export interface TabItemConfig {
  id: TabItem;
  label: string;
  iconName: string;
  onPress: () => void;
}

export interface BottomTabNavigatorProps {
  activeTab: TabItem;
  onTabPress: (tab: TabItem) => void;
  cartItemCount?: number;
}

// ========== Floating Search Button Types ==========
export interface FloatingSearchButtonProps {
  onPress: () => void;
  position?: {
    bottom?: number;
    right?: number;
  };
}

// ========== Drawer Types ==========
export interface DrawerItem {
  id: string;
  label: string;
  iconName?: string;
  onPress: () => void;
  divider?: boolean;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: DrawerItem[];
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
}

// ========== HomeScreen State Types ==========
export interface HomeScreenState {
  selectedMenuId: string | null;
  selectedCategoryId: string | null;
  products: Product[];
  isLoading: boolean;
  isDrawerOpen: boolean;
  activeTab: TabItem;
  favoriteProducts: string[];
}

