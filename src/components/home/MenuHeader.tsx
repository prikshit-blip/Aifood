import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { MenuHeaderProps } from '../../types/home';
import AppText from '../ui/AppText';
import ShimmerHeader from '../ui/ShimmerHeader';

const MenuHeader: React.FC<MenuHeaderProps> = ({
  items,
  selectedItemId,
  onItemSelect,
  loading = false,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  if (loading) {
    return <ShimmerHeader itemCount={4} itemWidth={120} itemHeight={40} />;
  }

  if (!items || items.length === 0) {
    return null;
  }

  const renderMenuItem = ({ item }: { item: typeof items[0] }) => {
    const isSelected = selectedItemId === item.id;
    
    return (
      <TouchableOpacity
        onPress={() => onItemSelect(item.id)}
          style={[
            styles.item,
            {
              marginRight: spacing.md || 16,
              paddingVertical: spacing.xs || 8,
              backgroundColor: isSelected
                ? colors.highlight || '#FFF5F0'
                : 'transparent',
              borderRadius: borderRadius.md || 8,
            },
          ]}
        activeOpacity={0.7}
      >
        <AppText
          style={[
            styles.itemText,
            {
              color:  colors.normalText || '#000000',

              fontWeight: isSelected ? '700' : '400',
            },
          ]}
        >
          {item.label}
        </AppText>
        {isSelected && (
          <View
            style={[
              styles.underline,
              {
                backgroundColor: colors.primary || '#FF6B35',
                marginTop: spacing.xs || 4,
              },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingVertical: spacing.sm || 8 }]}>
      <FlatList
        data={items}
        renderItem={renderMenuItem}
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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  underline: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
});

export default MenuHeader;

