import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ProductCardProps } from '../../types/home';
import AppText from '../ui/AppText';
import { getImage, ICONS } from '../../assests';
import AppImage from '../ui/AppImage';
import FastImage from 'react-native-fast-image';
import AppHeading from '../ui/AppHeading';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoriteToggle,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

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

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: colors.whiteBackground || '#FFFFFF',
          padding: spacing.sm || 8,
          marginBottom: spacing.md || 16,
          borderRadius: borderRadius.md || 12,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Product Image */}
        {productImage && (
          <Image
            source={productImage}
            style={[
              styles.image,
              {
                width: "40%",
                height: "100%",
                borderRadius: borderRadius.md || 12,
                backgroundColor: colors.greyBackground || '#F5F5F5',
              },
            ]}
            resizeMode="cover"
          />
        )}

        {/* Product Details */}
        <View style={[styles.details, { marginLeft: spacing.sm|| 8 }]}>
          {/* Title */}
          <AppText
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: colors.normalText || '#000000',
              marginBottom: spacing.xs || 4,
            }}
            numberOfLines={1}
          >
            {product.title || 'Untitled Product'}
          </AppText>

          <AppHeading
          fontSize={18}
          numberOfLines={1}
          style={{lineHeight:24,}}
          >
            {product.title || 'Untitled Product'}
          </AppHeading>

          <View style={styles.subHeadingContainer}>

          {/* Sub Heading */}
          {product.subHeading && (
            <AppText
              style={{
                fontSize: 12,
                color: colors.lightText || '#666666',
                marginBottom: spacing.xs || 4,
              }}
              numberOfLines={1}
            >
            {product.subHeading}
            </AppText>
          )}
            {product.subHeading} {product.isPopular && (
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: '#FFD700',
                    paddingHorizontal: spacing.xs || 8,
                    paddingVertical: 2,
                    borderRadius: borderRadius.sm || 4,
                    marginRight: spacing.xs || 4,
                  },
                ]}
              >
                <AppText style={{ fontSize: 10, fontWeight: '600', color: '#000000' }}>
                  Popular
                </AppText>
              </View>
            )}

            </View>

          {/* Tags Row (Popular, Dietary Icons) */}
          <View style={[styles.tagsRow, { marginBottom: spacing.xs || 4 }]}>
           

            {/* Dietary Icons */}
            <View style={styles.dietaryIcons}>
              {product.dietaryInfo?.isVegetarian && (
                <View
                  style={[
                    styles.dietaryIcon,
                    {
                      width: 16,
                      height: 16,
                      backgroundColor: '#4CAF50',
                      borderRadius: 2,
                      marginRight: spacing.xs || 4,
                    },
                  ]}
                />
              )}
              {product.dietaryInfo?.isVegan && (
                <View
                  style={[
                    styles.dietaryIcon,
                    {
                      width: 16,
                      height: 16,
                      backgroundColor: '#8BC34A',
                      borderRadius: 2,
                      marginRight: spacing.xs || 4,
                    },
                  ]}
                />
              )}
              {!product.dietaryInfo?.isVegetarian && !product.dietaryInfo?.isVegan && (
                <View
                  style={[
                    styles.dietaryIcon,
                    {
                      width: 16,
                      height: 16,
                      backgroundColor: '#FF5722',
                      borderRadius: 2,
                      marginRight: spacing.xs || 4,
                    },
                  ]}
                />
              )}
            </View>
          </View>

          {/* Description */}
          {product.description && (
            <AppText
              style={{
                fontSize: 12,
                color: colors.greyText || '#666666',
                marginBottom: spacing.sm || 8,
              }}
              numberOfLines={2}
            >
              {product.description}
            </AppText>
          )}

          {/* Price and Favorite */}
          <View style={[styles.footer, { marginTop: 'auto' }]}>
            <AppText
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: colors.primaryText || '#000000',
              }}
            >
              ${product.price?.toFixed(2) || '0.00'}
            </AppText>

            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {/* <AppText style={{ fontSize: 20 }}>
                {product.isFavorite ? '❤️' : '🤍'}
              </AppText> */}
              <FastImage
              source={product?.isFavorite?ICONS.heart_fill :ICONS.heart}
              tintColor={product.isFavorite ? colors?.primary||'#FF4444' : colors.black || '#666666'}
              style={{width:20, height:18,}}
              />
              {/* <AppImage
                source={ICONS.heart}
                width={24}
                height={24}
                tintColor={product.isFavorite ? '#FF4444' : colors.black || '#666666'}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dietaryIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dietaryIcon: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
});

export default ProductCard;

