import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { colors, spacing } = useTheme();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      height: 40,
      width: '100%',
      backgroundColor: colors?.surface || '#000',
      paddingHorizontal: spacing?.md || 16,
      justifyContent: 'center',
      elevation: 4,
    },
    text: {
      color: colors?.text || '#fff',
      fontSize: 14,
    }
  }), [colors, spacing]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export default Header;