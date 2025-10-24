# AIFood Multi-Tenant SaaS React Native App

## Navigation Setup

This project uses React Navigation v6 with Stack Navigator for screen navigation.

### Dependencies Installed
- `@react-navigation/native` - Core navigation library
- `@react-navigation/stack` - Stack navigator
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context` - Safe area handling
- `react-native-gesture-handler` - Gesture handling

### Navigation Structure

```
App
└── AppNavigator (Stack Navigator)
    ├── Splash - Animated splash screen
    ├── TenantSelector - Tenant selection
    ├── SignIn - Authentication (requires tenant param)
    ├── SignUp - User registration (requires tenant param)
    └── Home - Main dashboard (requires tenant + user params)
```

### Screen Flow
1. **Splash** → Auto-navigates to TenantSelector after animation
2. **TenantSelector** → Navigate to SignIn with selected tenant
3. **SignIn** → Navigate to Home on success, or SignUp
4. **SignUp** → Navigate to Home on success, or back to SignIn
5. **Home** → Sign out resets to TenantSelector

### Navigation Types
All navigation types are defined in `src/navigation/types.ts` for TypeScript support.

### Platform Configuration

#### Android
- Updated `MainActivity.kt` with gesture handler support
- Added proper imports for React Navigation

#### iOS
- AppDelegate.swift already properly configured
- No additional changes needed

### Usage
```typescript
// Navigate to a screen
navigation.navigate('ScreenName', { param: value });

// Replace current screen
navigation.replace('ScreenName');

// Reset navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'ScreenName' }],
});
```

### Features
- ✅ Type-safe navigation with TypeScript
- ✅ Smooth screen transitions
- ✅ Gesture-based navigation
- ✅ Proper parameter passing between screens
- ✅ Navigation state management
- ✅ Cross-platform compatibility
