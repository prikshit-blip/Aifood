/**
 * AIFood Multi-Tenant SaaS React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';

function App() {
  const tenantId = 'tenant_123'; // Get from login/auth
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider tenantId={tenantId}>
      <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
