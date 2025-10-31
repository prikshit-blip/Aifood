/**
 * AIFood Multi-Tenant SaaS React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { QueryProvider } from './src/providers/QueryProvider';
import { useTenantStore } from './src/store/stores/tenantStore';
import { useThemeStore } from './src/store/stores/themeStore';
import { useSessionStore } from './src/store/stores/sessionStore';
import { useTheme } from './src/hooks/useTheme';
import { getThemeApi } from './src/api/theme/themeApi';
import { adaptServerTheme } from './src/designSystem/theme/themeAdapter';
import { logger } from './src/utils/logger';
import ErrorBoundary from 'react-native-error-boundary';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();
  
  const tenant = useTenantStore((state: any) => state.tenant);
  const { setTheme, shouldRefetch } = useThemeStore();
  const { isSessionValid } = useSessionStore();
  
  // Initialize theme and session on app start
  useEffect(() => {
    console.log('🚀 AppContent useEffect triggered');
    console.log('📦 Tenant:', tenant);
    
    const initTheme = async () => {
      try {
        console.log('🎨 initTheme started');
        setIsLoading(true);
        setError(null);
        
        const domain = tenant?.domain || 'demo.theaihostess.com';
        console.log('🌐 Domain:', domain);
        
        // Check if we need to fetch theme
        const needsRefetch = shouldRefetch() || !isSessionValid();
        console.log('🔄 Needs refresh?', needsRefetch);
        console.log('  - shouldRefetch():', shouldRefetch());
        console.log('  - isSessionValid():', isSessionValid());
        
        if (needsRefetch) {
          console.log('🌐 Fetching theme from API...', domain);
          
          // Fetch theme (automatically extracts and stores session data)
          const serverTheme = await getThemeApi(domain);
          console.log('✅ Server theme received:', serverTheme);
          
          // Adapt and store theme
          const clientTheme = adaptServerTheme(serverTheme);
          console.log('✅ Client theme adapted:', clientTheme);
          
          setTheme(clientTheme);
          console.log('✅ Theme stored in themeStore');
          
          console.log('🎉 Theme and session initialized successfully');
        } else {
          console.log('⚡ Using cached theme and session (no API call needed)');
          const cachedTheme = useThemeStore.getState().theme;
          const cachedSession = useSessionStore.getState().session;
          console.log('📦 Cached theme:', cachedTheme);
          console.log('📦 Cached session:', cachedSession);
        }
        
        setIsLoading(false);
        console.log('✅ Theme initialization complete');
      } catch (err: any) {
        console.error('❌ Error initializing theme:', err);
        setError(err.message || 'Failed to load theme');
        setIsLoading(false);
      }
    };
    
    if (tenant) {
      console.log('✅ Tenant exists, calling initTheme()');
      initTheme();
    } else {
      console.log('⚠️ No tenant yet, skipping theme init');
      setIsLoading(false);
    }
  }, [tenant, shouldRefetch, isSessionValid, setTheme]);
  
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors?.background || '#121212' }]}>
        <ActivityIndicator size="large" color={colors?.primary || '#FF0000'} />
        <Text style={[styles.loadingText, { color: colors?.text || '#FFFFFF' }]}>
          Loading...
        </Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors?.background || '#121212' }]}>
        <Text style={[styles.errorText, { color: colors?.error || '#CF6679' }]}>
          {error}
        </Text>
        <Text style={[styles.errorSubtext, { color: colors?.textSecondary || '#B0B0B0' }]}>
          Please check your connection and try again
        </Text>
      </View>
    );
  }
  
  return <AppNavigator />;
}

function App() {
  console.log('🏁 App component mounted');
  
  // Initialize tenant on app start
  useEffect(() => {
    console.log('🏪 Tenant initialization useEffect triggered');
    const { setTenant } = useTenantStore.getState();
    
    // Set default tenant (in production, detect from domain/deeplink)
    const tenantConfig = {
      id: '1',
      domain: 'demo.theaihostess.com',
      name: 'Demo Restaurant',
      baseUrl: 'https://demo.theaihostess.com/api/v1',
      storeId: 112,
      storeUuid: '851ba4ac-016c-4e77-aec6-8d7c6d22f771',
      businessId: 42,
      features: {
        dineIn: true,
        pickup: true,
        delivery: true,
        tableBooking: true,
        loyalty: true,
      },
    };
    
    console.log('📝 Setting tenant:', tenantConfig);
    setTenant(tenantConfig);
    console.log('✅ Tenant set successfully');
  }, []);
  
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to error tracking service (Sentry, Crashlytics, etc.)
        console.error('App Error:', error, errorInfo);
        // Example: Sentry.captureException(error, { extra: errorInfo });
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          {/* Theme and session are initialized automatically */}
          {/* Session cookies (sid) will be included in all API calls */}
          <AppContent />
        </QueryProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default App;
