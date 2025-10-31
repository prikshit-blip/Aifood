import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { MenuHeaderProps } from '../../types/home';
import AppText from '../ui/AppText';

const MenuHeader: React.FC<MenuHeaderProps> = ({
  items,
  selectedItemId,
  onItemSelect,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingVertical: spacing.sm || 8 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.md || 16 }]}
      >
        {items.map((item) => {
          const isSelected = selectedItemId === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onItemSelect(item.id)}
              style={[
                styles.item,
                {
                  marginRight: spacing.md || 16,
                  paddingHorizontal: spacing.md || 16,
                  paddingVertical: spacing.xs || 8,
                  backgroundColor: isSelected
                    ? colors.secondaryBackground || '#FFF5F0'
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
                    color: isSelected
                      ? colors.primary || '#FF6B35'
                      : colors.normalText || '#000000',
                    fontWeight: isSelected ? '600' : '400',
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

