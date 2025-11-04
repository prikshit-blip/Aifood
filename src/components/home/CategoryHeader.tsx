import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { CategoryHeaderProps } from '../../types/home';
import AppText from '../ui/AppText';
import ShimmerHeader from '../ui/ShimmerHeader';

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  loading = false,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  if (loading) {
    return <ShimmerHeader itemCount={5} itemWidth={100} itemHeight={36} />;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  const renderCategory = ({ item }: { item: typeof categories[0] }) => {
    const isSelected = selectedCategoryId === item.id;
    
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect(item.id)}
        style={[
          styles.categoryPill,
          {
            marginRight: spacing.sm || 8,
            paddingHorizontal: spacing.sm || 8,
            paddingVertical: spacing.xs || 8,
            backgroundColor: isSelected
              ? colors.primary || '#FF6B35'
              : colors.whiteBackground || '#F5F5F5',
            borderRadius: borderRadius.lg || 20,
          },
        ]}
        activeOpacity={0.7}
      >
        <AppText
          style={{
            color: isSelected
              ? colors.whiteText || '#FFFFFF'
              : colors.normalText || '#000000',
            fontSize: 14,
            fontWeight: isSelected ? '600' : '400',
          }}
        >
          {item.label}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingVertical: spacing.sm || 8 }]}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.md || 16 }]}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryPill: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
});

export default CategoryHeader;

