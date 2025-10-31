# Error Handling Guide

This guide explains how to handle component crashes in your React Native app using Error Boundaries.

## Overview

The app now has a comprehensive error handling system that prevents component crashes from stopping the entire application. The solution is functional-component-friendly and easy to use.

## Quick Start

### 1. App-Level Protection (Already Done)

The root `App.tsx` is already wrapped with `ErrorBoundaryWrapper`, so the entire app is protected by default.

### 2. Wrap Individual Components

For components that might crash, wrap them with `ErrorBoundaryWrapper`:

```tsx
import { ErrorBoundaryWrapper } from '../components/ErrorBoundary';

function MyScreen() {
  return (
    <ErrorBoundaryWrapper name="MyScreen">
      <YourComponentThatMightCrash />
    </ErrorBoundaryWrapper>
  );
}
```

### 3. Use useErrorHandler Hook

For async operations and event handlers:

```tsx
import { useErrorHandler } from '../hooks/useErrorHandler';

function MyComponent() {
  const { handleAsyncError, handleError } = useErrorHandler('MyComponent');

  const fetchData = async () => {
    const result = await handleAsyncError(async () => {
      const data = await api.fetchData();
      return data;
    }, 'Failed to fetch data');
    
    if (result) {
      setData(result);
    }
  };

  return <View>...</View>;
}
```

## Files Created

### Core Components
- `src/components/ErrorBoundary/ErrorBoundary.tsx` - Class-based error boundary (required by React)
- `src/components/ErrorBoundary/ErrorBoundaryWrapper.tsx` - Functional wrapper for easy usage
- `src/components/ErrorBoundary/index.ts` - Exports

### Hooks
- `src/hooks/useErrorHandler.ts` - Hook for handling errors in functional components

### Examples
- `src/components/ErrorBoundary/ErrorBoundaryExample.tsx` - Usage examples
- `src/components/ErrorBoundary/README.md` - Detailed documentation

## Usage Patterns

### Pattern 1: Screen-Level Protection

Wrap entire screens that might have issues:

```tsx
import { ErrorBoundaryWrapper } from '../components/ErrorBoundary';

function HomeScreen() {
  return (
    <ErrorBoundaryWrapper name="HomeScreen">
      <View>
        <ComplexComponent />
        <AnotherComponent />
      </View>
    </ErrorBoundaryWrapper>
  );
}
```

### Pattern 2: Component-Level Protection

Protect individual risky components:

```tsx
<ErrorBoundaryWrapper name="RiskyComponent">
  <ThirdPartyComponent />
</ErrorBoundaryWrapper>
```

### Pattern 3: Async Error Handling

Use the hook for async operations:

```tsx
const { handleAsyncError } = useErrorHandler('MyComponent');

// In an async function
const loadData = async () => {
  const result = await handleAsyncError(
    async () => await fetch('/api/data'),
    'Failed to load data'
  );
  
  if (result) {
    // Success
    setData(result);
  } else {
    // Error was handled, but operation failed
    showToast('Failed to load data');
  }
};
```

### Pattern 4: Custom Error UI

Provide custom fallback UI:

```tsx
<ErrorBoundaryWrapper
  name="MyComponent"
  fallback={(error, errorInfo, resetError) => (
    <View style={customStyles}>
      <Text>Custom Error: {error.message}</Text>
      <Button title="Try Again" onPress={resetError} />
    </View>
  )}
>
  <YourComponent />
</ErrorBoundaryWrapper>
```

### Pattern 5: Error Logging

Log errors to tracking services:

```tsx
<ErrorBoundaryWrapper
  name="MyComponent"
  onError={(error, errorInfo) => {
    // Send to Sentry
    Sentry.captureException(error, { extra: errorInfo });
    
    // Or Crashlytics
    crashlytics().recordError(error);
  }}
>
  <YourComponent />
</ErrorBoundaryWrapper>
```

## Best Practices

1. **Place strategically**: Wrap major sections (screens, feature modules), not every small component
2. **Name your boundaries**: Always provide the `name` prop for easier debugging
3. **Handle gracefully**: Provide meaningful fallback UIs
4. **Log errors**: Use `onError` to send errors to tracking services
5. **Use hooks for async**: Use `useErrorHandler` for async operations and event handlers

## Where Error Boundaries Catch Errors

✅ **DO catch:**
- Render errors
- Lifecycle method errors
- Constructor errors
- Component tree errors

❌ **DON'T catch:**
- Event handlers (use try-catch or useErrorHandler)
- Async code (use useErrorHandler)
- Server-side rendering errors
- Errors thrown in the error boundary itself

## Integration with Error Tracking

To integrate with error tracking services, update the `onError` callback in `App.tsx`:

```tsx
// In App.tsx
<ErrorBoundaryWrapper
  name="App"
  onError={(error, errorInfo) => {
    // Sentry
    Sentry.captureException(error, { extra: errorInfo });
    
    // Or Firebase Crashlytics
    crashlytics().recordError(error);
    
    // Or your custom error tracking
    yourErrorTrackingService.log(error, errorInfo);
  }}
>
  {/* App content */}
</ErrorBoundaryWrapper>
```

## Testing Error Boundaries

To test error boundaries, you can intentionally throw errors:

```tsx
function TestComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('Test error!');
  }

  return (
    <Button 
      title="Crash Me" 
      onPress={() => setShouldCrash(true)} 
    />
  );
}

// Wrap it
<ErrorBoundaryWrapper name="TestComponent">
  <TestComponent />
</ErrorBoundaryWrapper>
```

## Need Help?

See the detailed examples in:
- `src/components/ErrorBoundary/ErrorBoundaryExample.tsx`
- `src/components/ErrorBoundary/README.md`
