import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../../components/ui/AppText';
import createStyles from './styles';

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
      title: '50% Off on All Burgers',
      description: 'Get 50% discount on all burger items. Valid until end of month.',
      discount: '50% OFF',
      validUntil: '2024-12-31',
      code: 'BURGER50',
    },
    {
      id: '2',
      title: 'Free Delivery',
      description: 'Free delivery on orders above $50. Use code at checkout.',
      discount: 'FREE',
      validUntil: '2024-12-31',
      code: 'FREEDEL',
    },
    {
      id: '3',
      title: 'Buy 2 Get 1 Free',
      description: 'Buy any 2 items and get 1 free. Limited time offer!',
      discount: 'B2G1',
      validUntil: '2024-12-31',
      code: 'B2G1FREE',
    },
    {
      id: '4',
      title: 'Weekend Special',
      description: '20% off on weekends. Every Saturday and Sunday.',
      discount: '20% OFF',
      validUntil: '2024-12-31',
      code: 'WEEKEND20',
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

  return (
    <>
      <AppText style={styles.title}>
        Promotions & Offers
      </AppText>

      {promos.map((promo) => (
        <TouchableOpacity
          key={promo.id}
          onPress={() => onPromoPress(promo)}
          style={styles.promoCard}
          activeOpacity={0.7}
        >
          <View style={styles.promoCardHeader}>
            <AppText style={styles.promoCardTitle}>
              {promo.title}
            </AppText>
            {promo.discount && (
              <View style={styles.discountBadge}>
                <AppText style={styles.discountBadgeText}>
                  {promo.discount}
                </AppText>
              </View>
            )}
          </View>

          <AppText style={styles.promoDescription}>
            {promo.description}
          </AppText>

          {promo.code && (
            <View style={styles.codeContainer}>
              <AppText style={styles.codeLabel}>
                Code:
              </AppText>
              <AppText style={styles.codeValue}>
                {promo.code}
              </AppText>
            </View>
          )}

          {promo.validUntil && (
            <AppText style={styles.validUntil}>
              Valid until: {promo.validUntil}
            </AppText>
          )}
        </TouchableOpacity>
      ))}

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

