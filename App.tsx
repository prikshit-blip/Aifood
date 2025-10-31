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
import { QueryProvider } from './src/providers/QueryProvider';

function App() {
  const tenantId = 'tenant_123'; // Get from login/auth
  // TODO: Auto-detect domain from tenant detection logic
  const domain = 'demo.theaihostess.com'; // Default domain, will be auto-detected later
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <ThemeProvider tenantId={tenantId} domain={domain}>
          <AppNavigator />
        </ThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}

export default App;
