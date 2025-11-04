import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import AppText from '../../components/ui/AppText';
import createStyles from './styles';
import { IMAGES } from '../../assests';

/**
 * Promo interface
 */
export interface Promo {
  id: string;
  title: string;
  description: string;
  discount?: string;
  imageUrl?: string;
  validUntil?: string;
  code?: string;
  backgroundColor?: string;
  buttonText?: string;
  buttonType?: 'promocode' | 'order';
  amount?: string;
}

/**
 * Async function to simulate fetching promos data
 * This would typically be an API call
 */
const fetchPromos = async (): Promise<Promo[]> => {
  // Simulate network delay (2 seconds)
  await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
  
  return [
    {
      id: '1',
      title: 'Flat 50% off on all Burgers',
      description: '',
      discount: '50% OFF',
      backgroundColor: '#4CAF50', // Green
      code: 'FOOD 30',
      buttonText: 'Promocode FOOD 30',
      buttonType: 'promocode',
      imageUrl: 'burger',
    },
    {
      id: '2',
      title: 'Flat 50% off on all Burgers',
      description: '',
      discount: '50% OFF',
      backgroundColor: '#FF9800', // Orange
      code: 'FOOD 30',
      buttonText: 'Promocode FOOD 30',
      buttonType: 'promocode',
      imageUrl: 'burger',
    },
    {
      id: '3',
      title: 'Meal at $199',
      description: 'Burger, Fries, Cold Drink',
      backgroundColor: '#2196F3', // Blue
      amount: '$199',
      buttonText: 'ORDER NOW',
      buttonType: 'order',
      imageUrl: 'meal',
    },
  ];
};

/**
 * Promise cache to prevent multiple API calls
 */
let promosPromise: Promise<Promo[]> | null = null;

/**
 * Get promos data (with caching)
 */
const getPromosPromise = () => {
  if (!promosPromise) {
    promosPromise = fetchPromos();
  }
  return promosPromise;
};

/**
 * Async PromoList Component Props
 */
export interface AsyncPromoListProps {
  onPromoPress: (promo: Promo) => void;
  colors: any;
  spacing: any;
  borderRadius: any;
  styles: ReturnType<typeof createStyles>;
}

/**
 * Promise cache with status tracking
 */
const promiseCache = new Map<Promise<any>, { status: 'pending' | 'resolved' | 'rejected'; result?: any; error?: Error }>();

/**
 * Custom hook to use promises with Suspense
 * This throws the promise when it's pending, which Suspense catches
 */
function useSuspensePromise<T>(promise: Promise<T>): T {
  // Check if we have cached result
  const cached = promiseCache.get(promise);
  
  if (cached) {
    if (cached.status === 'resolved') {
      return cached.result;
    }
    if (cached.status === 'rejected' && cached.error) {
      throw cached.error;
    }
    // If pending, throw the promise again (Suspense needs this)
    if (cached.status === 'pending') {
      throw promise;
    }
  }

  // If not cached, set up the promise to cache results
  promiseCache.set(promise, { status: 'pending' });
  
  promise
    .then((data) => {
      promiseCache.set(promise, { status: 'resolved', result: data });
    })
    .catch((err) => {
      promiseCache.set(promise, { status: 'rejected', error: err });
    });

  // Throw promise to trigger Suspense
  throw promise;
}

/**
 * Async PromoList Component
 * This component demonstrates Suspense working with async data
 * 
 * HOW SUSPENSE WORKS HERE:
 * 1. Component uses useSuspensePromise to read data from promise
 * 2. If promise is pending → useSuspensePromise throws the promise
 * 3. Suspense catches the thrown promise → shows fallback UI
 * 4. When promise resolves → React re-renders component
 * 5. Component now has data → renders actual content
 */
export const AsyncPromoList: React.FC<AsyncPromoListProps> = ({
  onPromoPress,
  colors,
  spacing,
  borderRadius,
  styles,
}) => {
  // Get the promise and use it with Suspense
  const promosPromise = getPromosPromise();
  
  // This will throw the promise if pending, which Suspense catches
  const promos = useSuspensePromise(promosPromise);

  const handleTermsPress = (promo: Promo) => {
    // Handle terms and conditions press
    onPromoPress(promo);
  };

  const handleButtonPress = (promo: Promo) => {
    // Handle button press (promocode or order)
    onPromoPress(promo);
  };

  return (
    <>
      {promos.map((promo) => {
        const cardStyle = [
          styles.promoCard,
          { backgroundColor: promo.backgroundColor || colors?.whiteBackground || '#FFFFFF' }
        ];

        // Get image source
        const imageSource = promo.imageUrl === 'burger' 
          ? IMAGES.burgerImg 
          : promo.imageUrl === 'meal' 
            ? IMAGES.burgerImg // Using burger as placeholder for meal
            : null;

        return (
          <View key={promo.id} style={cardStyle}>
            {/* Image Section */}
            {imageSource && (
              <View style={styles.promoImageContainer}>
                <Image
                  source={imageSource}
                  style={styles.promoImage}
                  resizeMode="cover"
                />
              </View>
            )}

            {/* Content Section */}
            <View style={styles.promoContent}>
              {/* Discount Badge */}
              {promo.discount && (
                <View style={styles.discountBadge}>
                  <AppText style={styles.discountBadgeText}>
                    {promo.discount}
                  </AppText>
                </View>
              )}

              {/* Title */}
              <AppText style={styles.promoCardTitle}>
                {promo.title}
              </AppText>

              {/* Description or Amount */}
              {promo.description ? (
                <AppText style={styles.promoDescription}>
                  {promo.description}
                </AppText>
              ) : promo.amount ? (
                <AppText style={styles.promoAmount}>
                  {promo.amount}
                </AppText>
              ) : null}

              {/* View T&C Link */}
              <TouchableOpacity
                onPress={() => handleTermsPress(promo)}
                style={styles.termsLink}
                activeOpacity={0.7}
              >
                <AppText style={styles.termsLinkText}>
                  View T&C
                </AppText>
              </TouchableOpacity>

              {/* Action Button */}
              {promo.buttonText && (
                <TouchableOpacity
                  onPress={() => handleButtonPress(promo)}
                  style={[
                    styles.promoButton,
                    promo.buttonType === 'order' && styles.promoButtonOrder
                  ]}
                  activeOpacity={0.8}
                >
                  <AppText style={styles.promoButtonText}>
                    {promo.buttonText}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      {promos.length === 0 && (
        <View style={styles.emptyStateContainer}>
          <AppText style={styles.emptyStateText}>
            No promotions available at the moment
          </AppText>
        </View>
      )}
    </>
  );
};

export default AsyncPromoList;

