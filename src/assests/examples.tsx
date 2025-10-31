/**
 * 📚 Assets Usage Examples
 * This file shows how to use assets in your screens
 */

import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Icons, Images, getIcon, getImage, type IconName, type ImageName } from './index';

// ============================================
// Example 1: Direct Usage
// ============================================

export const DirectUsageExample = () => {
  return (
    <View style={styles.container}>
      {/* Direct icon usage */}
      <Image source={Icons.cart} style={styles.icon} />
      <Image source={Icons.user} style={styles.icon} />
      <Image source={Icons.searchIcon} style={styles.icon} />
      
      {/* Direct image usage */}
      <Image source={Images.burgerImg} style={styles.image} />
      <Image source={Images.pizza} style={styles.image} />
    </View>
  );
};

// ============================================
// Example 2: Using Helper Functions
// ============================================

export const HelperFunctionExample = () => {
  const cartIcon = getIcon('cart');
  const burgerImage = getImage('burgerImg');
  
  return (
    <View style={styles.container}>
      <Image source={cartIcon} style={styles.icon} />
      <Image source={burgerImage} style={styles.image} />
    </View>
  );
};

// ============================================
// Example 3: Dynamic Asset Selection
// ============================================

interface DynamicIconProps {
  iconName: IconName;
  size?: number;
}

export const DynamicIconExample: React.FC<DynamicIconProps> = ({ iconName, size = 24 }) => {
  return (
    <Image
      source={getIcon(iconName)}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

// ============================================
// Example 4: Conditional Asset Loading
// ============================================

import { hasIcon, hasImage } from './index';

export const ConditionalAssetExample = ({ assetName }: { assetName: string }) => {
  if (hasIcon(assetName)) {
    // TypeScript knows assetName is valid IconName here
    return <Image source={getIcon(assetName)} style={styles.icon} />;
  }
  
  if (hasImage(assetName)) {
    // TypeScript knows assetName is valid ImageName here
    return <Image source={getImage(assetName)} style={styles.image} />;
  }
  
  return <Text>Asset not found: {assetName}</Text>;
};

// ============================================
// Example 5: Icon Button Component
// ============================================

interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  size?: number;
  tintColor?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  tintColor,
}) => {
  return (
    <Image
      source={getIcon(icon)}
      style={[
        styles.icon,
        { width: size, height: size },
        tintColor && { tintColor },
      ]}
      resizeMode="contain"
    />
  );
};

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  image: {
    width: 100,
    height: 100,
  },
});

