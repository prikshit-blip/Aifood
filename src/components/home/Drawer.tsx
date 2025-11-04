import React, { useEffect, useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { DrawerProps } from '../../types/home';
import AppText from '../ui/AppText';
import createStyles from './Drawer.styles';

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  items = [],
  user,
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  useEffect(() => {
    if (isOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, slideAnim]);

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.drawer,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              {/* User Info Section */}
              {user && (
                <View style={styles.userSection}>
                  <View style={styles.avatar}>
                    <AppText style={styles.avatarIcon}>👤</AppText>
                  </View>
                  {user.name && (
                    <AppText style={styles.userName}>
                      {user.name}
                    </AppText>
                  )}
                  {user.email && (
                    <AppText style={styles.userEmail}>
                      {user.email}
                    </AppText>
                  )}
                </View>
              )}

              {/* Drawer Items */}
              <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {item.divider && index > 0 && (
                      <View style={styles.divider} />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        item.onPress();
                        onClose();
                      }}
                      style={styles.drawerItem}
                      activeOpacity={0.7}
                    >
                      {item.iconName && (
                        <AppText style={styles.drawerItemIcon}>
                          {item.iconName}
                        </AppText>
                      )}
                      <AppText style={styles.drawerItemLabel}>
                        {item.label}
                      </AppText>
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Drawer;

