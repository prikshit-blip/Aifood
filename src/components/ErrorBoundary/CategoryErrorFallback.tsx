import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../ui/AppText';

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

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <View
      style={{
        paddingVertical: spacing.md || 16,
        paddingHorizontal: spacing.md || 16,
        backgroundColor: colors.greyBackground || '#F5F5F5',
        borderRadius: borderRadius.md || 8,
        marginHorizontal: spacing.md || 16,
        marginVertical: spacing.sm || 8,
        alignItems: 'center',
      }}
    >
      <AppText
        style={{
          fontSize: 14,
          color: colors.error || '#FF4444',
          marginBottom: spacing.xs || 4,
          textAlign: 'center',
        }}
      >
        ⚠️ Failed to load categories
      </AppText>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary || '#FF6B35',
          paddingHorizontal: spacing.md || 16,
          paddingVertical: spacing.xs || 8,
          borderRadius: borderRadius.sm || 4,
          marginTop: spacing.xs || 4,
        }}
        onPress={resetError}
        activeOpacity={0.7}
      >
        <AppText style={{ color: colors.whiteText || '#FFFFFF', fontSize: 12, fontWeight: '600' }}>
          Retry
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

