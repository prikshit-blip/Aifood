import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { CategoryHeaderProps } from '../../types/home';
import AppText from '../ui/AppText';

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const handleCategorySelect = (id: string) => {
    onCategorySelect(id);
  };

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingVertical: spacing.sm || 8 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.md || 16 }]}
      >
        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategorySelect(category.id)}
              style={[
                styles.categoryPill,
                {
                  marginRight: spacing.sm || 8,
                  paddingHorizontal: spacing.md || 16,
                  paddingVertical: spacing.xs || 8,
                  backgroundColor: isSelected
                    ? colors.primary || '#FF6B35'
                    : colors.greyBackground || '#F5F5F5',
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
                {category.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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

