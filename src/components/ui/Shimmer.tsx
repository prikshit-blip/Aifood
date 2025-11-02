import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  shimmer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Shimmer;

