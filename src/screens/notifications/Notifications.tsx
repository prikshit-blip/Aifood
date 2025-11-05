import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../../components/ui/AppText';
import ScreenHeader from '../../components/ui/ScreenHeader';
import createStyles from './Notifications.styles';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type?: 'order' | 'promotion' | 'system' | 'general';
}

interface NotificationsProps {
  onNotificationPress?: (notification: Notification) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onNotificationPress }) => {
  const { colors, spacing, borderRadius } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  // Mock notifications data - Replace with API call
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and is being prepared.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
      type: 'order',
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 20% off on your next order. Use code SAVE20',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      type: 'promotion',
    },
    {
      id: '3',
      title: 'Order Delivered',
      message: 'Your order #12340 has been delivered. Enjoy your meal!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
      type: 'order',
    },
    {
      id: '4',
      title: 'New Menu Item',
      message: 'Check out our new vegetarian options available now!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      type: 'promotion',
    },
    {
      id: '5',
      title: 'System Update',
      message: 'We have improved our app performance. Update available.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: true,
      type: 'system',
    },
  ]);

  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch notifications from API
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleNotificationPress = useCallback(
    (notification: Notification) => {
      // Mark as read
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif
        )
      );
      onNotificationPress?.(notification);
    },
    [onNotificationPress]
  );

  const formatTimestamp = useCallback((date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Handle future dates
    if (diffMs < 0) {
      return 'Just now';
    }

    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
    const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    // Format date for older notifications
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: diffDays >= 365 ? 'numeric' : undefined,
    });
  }, []);

  const renderNotificationItem = useCallback(
    ({ item }: { item: Notification }) => {
      return (
        <TouchableOpacity
          style={[
            styles.notificationItem,
            !item.isRead && styles.unreadNotification,
          ]}
          onPress={() => handleNotificationPress(item)}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}. ${item.message}`}
          accessibilityHint={item.isRead ? 'Read notification' : 'Unread notification'}
        >
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <AppText
                style={[
                  styles.notificationTitle,
                  
                ]}
                numberOfLines={1}
              >
                {item.title}
              </AppText>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>
            <AppText style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </AppText>
            <AppText style={styles.notificationTime}>
              {formatTimestamp(item.timestamp)}
            </AppText>
          </View>
         
        </TouchableOpacity>
      );
    },
    [styles, colors, handleNotificationPress, formatTimestamp]
  );

  const renderEmptyState = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <AppText style={styles.emptyIcon}>🔔</AppText>
        <AppText style={styles.emptyTitle}>No notifications</AppText>
        <AppText style={styles.emptyMessage}>
          You're all caught up! New notifications will appear here.
        </AppText>
      </View>
    );
  }, [styles.emptyContainer, styles.emptyIcon, styles.emptyTitle, styles.emptyMessage]);

  // Memoize unread count to avoid recalculation on every render
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        showBackButton={false}
        // rightComponent={
        //   unreadCount > 0 ? (
        //     <AppText style={styles.headerBadge}>{unreadCount}</AppText>
        //   ) : undefined
        // }
      />
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          notifications.length === 0 ? styles.emptyListContainer : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors?.primary || '#FF6B35'}
            colors={[colors?.primary || '#FF6B35']}
          />
        }
        showsVerticalScrollIndicator={false}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={(_, index) => ({
          length: 100, // Approximate item height
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
};

export default Notifications;

