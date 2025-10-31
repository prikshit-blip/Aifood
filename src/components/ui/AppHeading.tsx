import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useThemeContext } from '../../contexts/ThemeContext';

type HeadingVariant = 'default' | 'primary';

interface HeadingProps {
  children: React.ReactNode;
  variant?: HeadingVariant;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const AppHeading: React.FC<HeadingProps> = ({
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
    primary_text?: string;
    text?: string;
  };

  const resolvedColor =
    color || (variant === 'primary' ? colors.primary || '#FF6B35' : colors.primary_text || '#000000');

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        {
          color: resolvedColor,
          fontSize: fontSize ?? 24,
          fontWeight: fontWeight ?? '700',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Montserrat',
    lineHeight: 32,
    letterSpacing: 0,
    width: '100%',
  },
});

export default AppHeading;


