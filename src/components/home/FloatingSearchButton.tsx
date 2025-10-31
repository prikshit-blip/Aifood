import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FloatingSearchButtonProps } from '../../types/home';
import AppText from '../ui/AppText';

const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({
  onPress,
  position = { bottom: 100, right: 16 },
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: colors.primary || '#FF6B35',
          width: 56,
          height: 56,
          borderRadius: 28,
          bottom: position.bottom || 80,
          right: position.right || 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        },
      ]}
    >
      <AppText style={{ fontSize: 24, color: colors.whiteText || '#FFFFFF' }}>
        🔍
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingSearchButton;

