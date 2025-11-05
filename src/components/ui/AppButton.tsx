import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const buttons = {
    primary_button: {
      background: colors?.text || '#000000',
      text_color: '#FFFFFF',
    },
    secondary_button: {
      background: colors?.surface || '#F5F5F5',
      text_color: colors?.text || '#000000',
    },
  } as {
    primary_button?: { background?: string; text_color?: string };
    secondary_button?: { background?: string; text_color?: string };
  };

  const variantStyles = getVariantStyles(variant, buttons);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.base,
        variantStyles.container,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color || '#FFFFFF'} />
      ) : (
        <Text style={[styles.text, variantStyles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

function getVariantStyles(
  variant: ButtonVariant,
  buttons: {
    primary_button?: { background?: string; text_color?: string };
    secondary_button?: { background?: string; text_color?: string };
  }
) {
  const primaryBg = buttons.primary_button?.primaryColor || '#000000';
  const primaryText = buttons.primary_button?.text_color || '#FFFFFF';
  const secondaryBg = buttons.secondary_button?.background || '#F5F5F5';
  const secondaryText = buttons.secondary_button?.text_color || '#000000';

  switch (variant) {
    case 'secondary':
      return {
        container: { backgroundColor: secondaryBg } as ViewStyle,
        text: { color: secondaryText } as TextStyle,
      };
    case 'outline':
      return {
        container: {
          backgroundColor: "#f6f6f6",
          borderWidth: 1,
          borderOpacity: 0.5,
          borderColor: 'rgba(190, 185, 185, 0.5)',
        } as ViewStyle,
        text: { color: '#000000' } as TextStyle,
      };
    case 'primary':
    default:
      return {
        container: { backgroundColor: primaryBg } as ViewStyle,
        text: { color: primaryText } as TextStyle,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AppButton;


