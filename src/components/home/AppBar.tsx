import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppBarProps } from '../../types/home';
import AppText from '../ui/AppText';
import FastImage from 'react-native-fast-image';
import { ICONS } from '../../assests';

const AppBar: React.FC<AppBarProps> = ({
  onMenuPress,
  onNotificationPress,
  hasNotifications = false,
}) => {
  const { colors, spacing } = useTheme();

  if (!colors || !spacing) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.sm || 8, paddingTop: spacing.sm || 8 }]}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity
        onPress={onMenuPress}
        style={[styles.iconButton, { padding: spacing.xs || 8 }]}
        activeOpacity={0.7}
        accessibilityLabel="Open menu"
        accessibilityRole="button"
      >
        <View style={styles.hamburgerIcon}>
          <View style={[styles.hamburgerLine, { backgroundColor: colors.primaryText || '#000000' }]} />
          <View style={[styles.hamburgerLine, { backgroundColor: colors.primaryText || '#000000' }]} />
          <View style={[styles.hamburgerLine, { backgroundColor: colors.primaryText || '#000000' }]} />
        </View>
      </TouchableOpacity>

      {/* Notification Button */}
      <TouchableOpacity
        onPress={onNotificationPress}
        style={[styles.iconButton, { padding: spacing.xs || 8 }]}
        activeOpacity={0.7}
        accessibilityLabel="Notifications"
        accessibilityRole="button"
      >
        <View style={styles.notificationContainer}>
          {/* Bell Icon (simplified) */}
          <View style={[styles.bellIcon, { borderColor: colors.primaryText || '#000000' }]}>
            
              <FastImage
                source={ICONS.Service}
                tintColor={"#666666"}
                style={{width:24,height:24}}
               />
            
          </View>
          {/* Notification Badge */}
          {hasNotifications && (
            <View style={[styles.badge, { backgroundColor: colors.error || '#FF4444' }]} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    height: 2,
    width: 24,
    borderRadius: 1,
  },
  notificationContainer: {
    position: 'relative',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});

export default AppBar;

