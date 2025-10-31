import { Alert } from 'react-native';

/**
 * Error types
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  data?: any;
}

/**
 * Handle API errors with user-friendly messages
 */
export const handleApiError = (error: any, customMessage?: string): void => {
  console.error('API Error:', error);
  
  if (customMessage) {
    Alert.alert('Error', customMessage);
    return;
  }
  
  // Network errors
  if (error.code === 'NETWORK_ERROR' || !error.status) {
    Alert.alert(
      'Network Error',
      'Please check your internet connection and try again.',
      [{ text: 'OK' }]
    );
    return;
  }
  
  // HTTP status-based errors
  switch (error.status) {
    case 400:
      Alert.alert('Invalid Request', error.message || 'Please check your input.');
      break;
    case 401:
      Alert.alert('Unauthorized', 'Your session has expired. Please sign in again.');
      break;
    case 403:
      Alert.alert('Forbidden', 'You don\'t have permission to perform this action.');
      break;
    case 404:
      Alert.alert('Not Found', error.message || 'The requested resource was not found.');
      break;
    case 422:
      Alert.alert('Validation Error', error.message || 'Please check your input.');
      break;
    case 429:
      Alert.alert('Too Many Requests', 'Please wait a moment and try again.');
      break;
    case 500:
    case 502:
    case 503:
      Alert.alert('Server Error', 'Something went wrong on our end. Please try again later.');
      break;
    default:
      Alert.alert('Error', error.message || 'An unexpected error occurred.');
  }
};

/**
 * Handle validation errors
 */
export const handleValidationError = (errors: Record<string, string>): void => {
  const firstError = Object.values(errors)[0];
  if (firstError) {
    Alert.alert('Validation Error', firstError);
  }
};

/**
 * Show success message
 */
export const showSuccess = (message: string, onOk?: () => void): void => {
  Alert.alert('Success', message, onOk ? [{ text: 'OK', onPress: onOk }] : [{ text: 'OK' }]);
};

/**
 * Show confirmation dialog
 */
export const showConfirmation = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      { text: 'Cancel', onPress: onCancel, style: 'cancel' },
      { text: 'Confirm', onPress: onConfirm },
    ]
  );
};

/**
 * Log error for debugging (can be sent to analytics)
 */
export const logError = (context: string, error: any): void => {
  const errorData = {
    context,
    message: error.message || 'Unknown error',
    status: error.status,
    code: error.code,
    timestamp: new Date().toISOString(),
  };
  
  console.error(`[${context}]`, errorData);
  
  // TODO: Send to analytics service (Firebase, Sentry, etc.)
  // analytics.logError(errorData);
};

