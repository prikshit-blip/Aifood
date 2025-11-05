import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import AppText from './AppText';
import { ICONS } from '../../assests';
import FastImage from 'react-native-fast-image';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
  rightComponent,
}) => {
  const navigation = useNavigation();
  const { colors, spacing } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  if (!colors || !spacing) {
    return null;
  }

  return (
    <View
      style={[
        styles.header,
        {
          paddingHorizontal: spacing.sm || 8,
          paddingVertical: spacing.sm || 12,
          backgroundColor: colors.whiteBackground || '#FFFFFF',
        },
      ]}
    >
      {showBackButton ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={[
            styles.backButton,
            {
              padding: spacing.xs || 8,
            },
          ]}
          activeOpacity={0.7}
        >
          <FastImage
            source={ICONS.arrowLeft}
            style={styles.backIcon}
            tintColor={colors.normalText || '#000000'}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <AppText
        style={[
          styles.headerTitle,
          {
            color: colors.normalText || '#000000',
            
          },
        ]}
      >
        {title}
      </AppText>

      {rightComponent ? (
        <View style={styles.rightContainer}>{rightComponent}</View>
      ) : (
        <View style={styles.rightContainer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // iOS shadow
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // Android shadow
    elevation: 1,
  } as ViewStyle,
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  } as TextStyle,
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  } as ViewStyle,
});

export default ScreenHeader;

