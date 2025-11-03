import React, { Suspense, useState, useMemo, useCallback } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useDrawerNavigation } from '../../hooks/useDrawerNavigation';
import ErrorBoundary from 'react-native-error-boundary';
import {
  AppBar,
} from '../../components/home';
import AppText from '../../components/ui/AppText';
import Shimmer from '../../components/ui/Shimmer';
import { ErrorFallback } from '../../components/ErrorBoundary';
import { AsyncPromoList, type Promo } from './AsyncPromoList';
import createStyles from './styles';

type PromosScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Promos'>;

const PromosScreen: React.FC = () => {
  const navigation = useNavigation<PromosScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();
  const { openDrawer } = useDrawerNavigation();
  
  // State to control demo mode (toggle between async and sync)
  const [useAsyncDemo, setUseAsyncDemo] = useState(true);

  // ========== Handlers ==========
  const handleDrawerOpen = useCallback(() => {
    openDrawer();
  }, [openDrawer]);

  const handleNotificationPress = useCallback(() => {
    Alert.alert('Notifications', 'No new notifications');
  }, []);

  const handlePromoPress = useCallback((promo: Promo) => {
    Alert.alert('Promo Code', `Code: ${promo.code || 'N/A'}\n\n${promo.description}`);
  }, []);

  // ========== Styles ==========
  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      {/* App Bar */}
      <AppBar
        onMenuPress={handleDrawerOpen}
        onNotificationPress={handleNotificationPress}
        hasNotifications={true}
      />

      {/* Content */}
      {/* 
        SUSPENSE WORKING DEMONSTRATION:
        
        ═══════════════════════════════════════════════════════════
        HOW SUSPENSE WORKS:
        ═══════════════════════════════════════════════════════════
        
        1. Suspense wraps AsyncPromoList component
        2. AsyncPromoList uses use(promosPromise) to read the promise
        3. If promise is PENDING:
           → React throws the promise
           → Suspense catches it
           → Shows fallback UI (Shimmer loading states)
        
        4. When promise RESOLVES:
           → React re-renders AsyncPromoList
           → Component receives data
           → Renders actual promo cards
        
        ═══════════════════════════════════════════════════════════
        FALLBACK UI (Shown while loading):
        ═══════════════════════════════════════════════════════════
        - Shimmer placeholders for title
        - Shimmer placeholders for 4 promo cards
        - Matches the structure of actual content
        - Provides smooth loading experience
        ═══════════════════════════════════════════════════════════
      */}
      <ErrorBoundary
        onError={(error: Error, stackTrace: string) => {
          console.error('🛡️ ErrorBoundary caught error in PromosScreen:', error, stackTrace);
          // You can also send error to error reporting service here
          // Example: Sentry.captureException(error, { extra: { stackTrace } });
        }}
        FallbackComponent={(props) => (
          <ErrorFallback
            {...props}
            header="⚠️ Failed to Load Promotions"
            message="An unexpected error occurred while loading promotions"
            screenName="PromosScreen"
            buttonText="Try Again"
          />
        )}
      >
        <Suspense
          fallback={
            <ScrollView
              style={styles.suspenseFallbackScrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Loading State: Shimmer UI */}
              <Shimmer width="60%" height={32} borderRadius={8} style={{ marginBottom: spacing?.lg || 24 }} />
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.shimmerCard}>
                  <View style={styles.shimmerRow}>
                    <Shimmer width="70%" height={20} borderRadius={4} />
                    <Shimmer width={60} height={24} borderRadius={6} />
                  </View>
                  <Shimmer width="100%" height={16} borderRadius={4} style={{ marginBottom: spacing?.xs || 4 }} />
                  <Shimmer width="90%" height={16} borderRadius={4} style={{ marginBottom: spacing?.sm || 8 }} />
                  <View style={styles.shimmerCodeRow}>
                    <Shimmer width={40} height={14} borderRadius={4} style={{ marginRight: spacing?.xs || 4 }} />
                    <Shimmer width={80} height={14} borderRadius={4} />
                  </View>
                </View>
              ))}
            </ScrollView>
          }
        >
          {/* Actual Content: AsyncPromoList component */}
          <ErrorBoundary
            onError={(error: Error, stackTrace: string) => {
              console.error('🛡️ ErrorBoundary caught error in AsyncPromoList:', error, stackTrace);
            }}
            FallbackComponent={(props) => (
              <ErrorFallback
                {...props}
                header="⚠️ Failed to Load Promo List"
                message="Unable to load the promotions list"
                screenName="PromosScreen - AsyncPromoList"
                buttonText="Retry"
              />
            )}
          >
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              {useAsyncDemo ? (
                // Async version - uses Suspense
                <AsyncPromoList
                  onPromoPress={handlePromoPress}
                  colors={colors}
                  spacing={spacing}
                  borderRadius={borderRadius}
                  styles={styles}
                />
              ) : (
                // Sync version - immediate render (for comparison)
                <>
                  <AppText style={styles.syncModeTitle}>
                    Promotions & Offers (Sync Mode)
                  </AppText>
                  <AppText style={styles.syncModeDescription}>
                    Switch to async mode to see Suspense in action!
                  </AppText>
                </>
              )}
            </ScrollView>
          </ErrorBoundary>
        </Suspense>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default PromosScreen;

