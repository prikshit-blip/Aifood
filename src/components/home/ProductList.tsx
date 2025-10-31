import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ProductListProps } from '../../types/home';
import ProductCard from './ProductCard';
import AppText from '../ui/AppText';

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductPress,
  onFavoriteToggle,
  loading = false,
  emptyMessage = 'No products available',
}) => {
  const { colors, spacing } = useTheme();

  if (!colors || !spacing) {
    return null;
  }

  if (loading) {
    return (
      <View style={[styles.centerContainer, { paddingVertical: spacing.xl || 40 }]}>
        <ActivityIndicator size="large" color={colors.primary || '#FF6B35'} />
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={[styles.centerContainer, { paddingVertical: spacing.xl || 40 }]}>
        <AppText style={{ color: colors.greyText || '#666666', fontSize: 16 }}>
          {emptyMessage}
        </AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item?.id || `product-${Math.random()}`}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={onProductPress}
          onFavoriteToggle={onFavoriteToggle}
        />
      )}
      style={styles.list}
      contentContainerStyle={[
        styles.listContent,
        { paddingVertical: spacing.sm || 8, paddingBottom: 100 },
      ]}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20, // Small padding for list content
  },
});

export default ProductList;

