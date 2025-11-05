import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import BottomSheet from '../../components/ui/BottomSheet';
import Notifications, { Notification } from './Notifications';

export interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNotificationPress?: (notification: Notification) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isVisible,
  onClose,
  onNotificationPress,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  const handleNotificationPress = useCallback(
    (notification: Notification) => {
      onNotificationPress?.(notification);
      // Optionally close modal after notification press
      // onClose();
    },
    [onNotificationPress]
  );

  // Memoize styles to avoid recreation on every render
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        } as ViewStyle,
        content: {
          paddingHorizontal: 0,
          paddingVertical: 16,
        } as ViewStyle,
      }),
    []
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      height={0.65} // 85% of screen height
      showBackdrop={true}
      backdropOpacity={0.5}
      enableSwipeToDismiss={true}
      showDragHandle={false}
      closeOnBackdropPress={true}
      animationDuration={300}
      contentStyle={styles.content}
    >
      <View style={styles.container}>
        <Notifications onNotificationPress={handleNotificationPress} />
      </View>
    </BottomSheet>
  );
};

export default NotificationModal;

