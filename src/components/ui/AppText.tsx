import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useThemeContext } from '../../contexts/ThemeContext';

type TextVariant = 'default' | 'primary' | 'secondary';

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'default',
  color,
  fontSize,
  fontWeight,
  style,
  numberOfLines,
}) => {
  const { theme, themeData } = useThemeContext();

  const colors = (theme?.colors || themeData?.sections?.colors || {}) as {
    primary?: string;
    background_text?: string;
    primary_text?: string;
    text?: string;
  };

  const resolvedColor =
    color || (variant === 'primary' ? colors.primary || '#FF6B35' : colors.primary_text || '#000000');

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        {
          color: resolvedColor,
          fontSize: fontSize ?? 16,
          fontWeight: fontWeight ?? '400',
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Montserrat',
    lineHeight: 24,
    letterSpacing: 0,
  },
});

export default AppText;


