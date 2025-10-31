import { useCallback } from 'react';

/**
 * Hook for handling errors in functional components
 * Useful for catching errors in async operations and event handlers
 * 
 * @returns Object with error handler functions
 * 
 * @example
 * ```tsx
 * const { handleAsyncError, handleError } = useErrorHandler();
 * 
 * const fetchData = async () => {
 *   try {
 *     const data = await api.fetchData();
 *     setData(data);
 *   } catch (error) {
 *     handleAsyncError(error, 'Failed to fetch data');
 *   }
 * };
 * 
 * const handlePress = () => {
 *   try {
 *     // Some operation that might throw
 *     riskyOperation();
 *   } catch (error) {
 *     handleError(error, 'Operation failed');
 *   }
 * };
 * ```
 */
export const useErrorHandler = (componentName?: string) => {
  const handleError = useCallback((error: Error | unknown, context?: string) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorContext = context ? `[${context}]` : componentName ? `[${componentName}]` : '';
    
    console.error(`${errorContext} Error:`, error);
    
    // Here you can also send errors to error tracking services like:
    // - Sentry
    // - Bugsnag
    // - Crashlytics
    // Example: Sentry.captureException(error);
    
    return error;
  }, [componentName]);

  const handleAsyncError = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, errorMessage);
      return null;
    }
  }, [handleError]);

  /**
   * Wraps an async function to automatically catch and handle errors
   * 
   * @example
   * const safeFetchData = withErrorHandler(async () => {
   *   const data = await api.fetchData();
   *   return data;
   * }, 'Failed to fetch data');
   * 
   * const data = await safeFetchData();
   */
  const withErrorHandler = useCallback(<T,>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ) => {
    return handleAsyncError(asyncFn, errorMessage);
  }, [handleAsyncError]);

  return {
    handleError,
    handleAsyncError,
    withErrorHandler,
  };
};
