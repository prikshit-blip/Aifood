import React, { useMemo } from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ProductCardProps } from '../../types/home';
import AppText from '../ui/AppText';
import { getImage, ICONS } from '../../assests';
import AppImage from '../ui/AppImage';
import FastImage from 'react-native-fast-image';
import AppHeading from '../ui/AppHeading';
import createStyles from './ProductCard.styles';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoriteToggle,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  if (!product) {
    return null;
  }

  const handlePress = () => {
    if (onPress && product) {
      onPress(product);
    }
  };

  const handleFavoritePress = () => {
    if (onFavoriteToggle && product) {
      onFavoriteToggle(product.id, !product.isFavorite);
    }
  };

  // Get product image
  const productImage: ImageSourcePropType | undefined = product.imageUri
    ? { uri: product.imageUri }
    : product.imageUrl
    ? { uri: product.imageUrl }
    : getImage('burgerImg') || undefined;

  // Determine dietary icon style
  const getDietaryIconStyle = () => {
    if (product.dietaryInfo?.isVegetarian) {
      return [styles.dietaryIcon, styles.dietaryIconVegetarian];
    }
    if (product.dietaryInfo?.isVegan) {
      return [styles.dietaryIcon, styles.dietaryIconVegan];
    }
    return [styles.dietaryIcon, styles.dietaryIconNonVegetarian];
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Product Image */}
        {productImage && (
          <Image
            source={productImage}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Product Details */}
        <View style={styles.details}>
          {/* Title */}
          <AppText
            style={styles.title}
            numberOfLines={1}
          >
            {product.title || 'Untitled Product'}
          </AppText>

          <AppHeading
            fontSize={18}
            numberOfLines={1}
            style={styles.heading}
          >
            {product.title || 'Untitled Product'}
          </AppHeading>

          <View style={styles.subHeadingContainer}>
            {/* Sub Heading */}
            {product.subHeading && (
              <AppText
                style={styles.subHeading}
                numberOfLines={1}
              >
                {product.subHeading}
              </AppText>
            )}
            {product.isPopular && (
              <View style={styles.tag}>
                <AppText style={styles.tagText}>
                  Popular
                </AppText>
              </View>
            )}
          </View>

          {/* Tags Row (Popular, Dietary Icons) */}
          <View style={styles.tagsRow}>
            {/* Dietary Icons */}
            <View style={styles.dietaryIcons}>
              {(product.dietaryInfo?.isVegetarian ||
                product.dietaryInfo?.isVegan ||
                (!product.dietaryInfo?.isVegetarian && !product.dietaryInfo?.isVegan)) && (
                <View style={getDietaryIconStyle()} />
              )}
            </View>
          </View>

          {/* Description */}
          {product.description && (
            <AppText
              style={styles.description}
              numberOfLines={2}
            >
              {product.description}
            </AppText>
          )}

          {/* Price and Favorite */}
          <View style={styles.footer}>
            <AppText style={styles.price}>
              ${product.price?.toFixed(2) || '0.00'}
            </AppText>

            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FastImage
                source={product?.isFavorite ? ICONS.heart_fill : ICONS.heart}
                tintColor={product.isFavorite ? colors?.primary || '#FF4444' : colors.black || '#666666'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

