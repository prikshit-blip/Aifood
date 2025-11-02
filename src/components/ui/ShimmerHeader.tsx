import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Shimmer from './Shimmer';

interface ShimmerHeaderProps {
  itemCount?: number;
  itemWidth?: number;
  itemHeight?: number;
}

const ShimmerHeader: React.FC<ShimmerHeaderProps> = ({
  itemCount = 5,
  itemWidth = 100,
  itemHeight = 36,
}) => {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing?.sm || 8 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing?.md || 16 },
        ]}
      >
        {Array.from({ length: itemCount }).map((_, index) => (
          <Shimmer
            key={index}
            width={itemWidth}
            height={itemHeight}
            borderRadius={20}
            style={{ marginRight: spacing?.sm || 8 }}
          />
        ))}
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
});

export default ShimmerHeader;

