import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../ui/AppText';
import createStyles from './styles';

export interface CategoryErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

/**
 * Compact error fallback for CategoryHeader
 * Shows a small error message instead of full-screen error
 */
export const CategoryErrorFallback: React.FC<CategoryErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <View style={styles.categoryContainer}>
      <AppText style={styles.categoryErrorText}>
        ⚠️ Failed to load categories
      </AppText>
      <TouchableOpacity
        style={styles.categoryRetryButton}
        onPress={resetError}
        activeOpacity={0.7}
      >
        <AppText style={styles.categoryRetryButtonText}>
          Retry
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

