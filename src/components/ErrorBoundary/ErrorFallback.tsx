import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../ui/AppText';
import createStyles from './styles';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  header?: string;
  message?: string;
  screenName?: string;
  buttonText?: string;
}

/**
 * Reusable Error Fallback Component
 * 
 * Displays a user-friendly error message with retry functionality.
 * Can be used across different screens with customizable header and message.
 * 
 * @param error - The error object
 * @param resetError - Function to reset the error and retry
 * @param header - Custom header/title text (default: "⚠️ Something went wrong")
 * @param message - Custom error message (default: error.message or generic message)
 * @param screenName - Name of the screen where error occurred (will be logged on retry)
 * @param buttonText - Custom button text (default: "Try Again")
 * 
 * @example
 * ```tsx
 * <ErrorBoundary
 *   FallbackComponent={(props) => (
 *     <ErrorFallback
 *       {...props}
 *       header="Failed to Load"
 *       message="Unable to load data"
 *       screenName="HomeScreen"
 *     />
 *   )}
 * />
 * ```
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  header = '⚠️ Something went wrong',
  message,
  screenName,
  buttonText = 'Try Again',
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  /**
   * Handle retry button press
   * Logs the screen name where error occurred and resets the error
   */
  const handleRetry = () => {
    if (screenName) {
      console.log(`🔄 Retrying after error on screen: ${screenName}`);
      console.log(`📱 Screen Name: ${screenName}`);
      console.log(`❌ Error Details:`, error);
    }
    resetError();
  };

  // Use provided message or fallback to error message or default message
  const displayMessage = message || error?.message || 'An unexpected error occurred';

  return (
    <View style={styles.container}>
      <AppText style={styles.header}>
        {header}
      </AppText>
      
      <AppText style={styles.message}>
        {displayMessage}
      </AppText>

      {screenName && (
        <AppText style={styles.screenName}>
          Screen: {screenName}
        </AppText>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRetry}
        activeOpacity={0.7}
      >
        <AppText style={styles.buttonText}>
          {buttonText}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

