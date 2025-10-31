import React, { useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { DrawerProps } from '../../types/home';
import AppText from '../ui/AppText';

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  items = [],
  user,
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

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
                  backgroundColor: colors.whiteBackground || '#FFFFFF',
                  paddingHorizontal: spacing.lg || 20,
                  paddingTop: spacing.xl || 40,
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              {/* User Info Section */}
              {user && (
                <View
                  style={[
                    styles.userSection,
                    {
                      paddingBottom: spacing.lg || 20,
                      marginBottom: spacing.lg || 20,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.greyBackground || '#F5F5F5',
                    },
                  ]}
                >
                  {user.avatarUrl ? (
                    <View
                      style={[
                        styles.avatar,
                        {
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: colors.secondaryBackground || '#FFF5F0',
                        },
                      ]}
                    >
                      <AppText style={{ fontSize: 24 }}>👤</AppText>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.avatar,
                        {
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: colors.secondaryBackground || '#FFF5F0',
                        },
                      ]}
                    >
                      <AppText style={{ fontSize: 24 }}>👤</AppText>
                    </View>
                  )}
                  {user.name && (
                    <AppText
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.primaryText || '#000000',
                        marginTop: spacing.sm || 8,
                      }}
                    >
                      {user.name}
                    </AppText>
                  )}
                  {user.email && (
                    <AppText
                      style={{
                        fontSize: 14,
                        color: colors.greyText || '#666666',
                        marginTop: spacing.xs || 4,
                      }}
                    >
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
                      <View
                        style={[
                          styles.divider,
                          {
                            backgroundColor: colors.greyBackground || '#F5F5F5',
                            marginVertical: spacing.md || 16,
                          },
                        ]}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        item.onPress();
                        onClose();
                      }}
                      style={[
                        styles.drawerItem,
                        {
                          paddingVertical: spacing.md || 16,
                          borderRadius: borderRadius.sm || 8,
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      {item.iconName && (
                        <AppText style={{ fontSize: 20, marginRight: spacing.md || 16 }}>
                          {item.iconName}
                        </AppText>
                      )}
                      <AppText
                        style={{
                          fontSize: 16,
                          color: colors.primaryText || '#000000',
                        }}
                      >
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  drawer: {
    width: 280,
    height: '100%',
  },
  userSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});

export default Drawer;

