import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useTheme } from '../../hooks/useTheme';
import AppText from '../../components/ui/AppText';
import ScreenHeader from '../../components/ui/ScreenHeader';
import createStyles from './styles';

type ServiceScreenNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Service'>;

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  available?: boolean;
}

const ServiceScreen: React.FC = () => {
  const navigation = useNavigation<ServiceScreenNavigationProp>();
  const { colors, spacing, borderRadius } = useTheme();

  // Mock service data
  const services: Service[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Table Reservation',
        description: 'Reserve a table for your dining experience. Book in advance to avoid waiting.',
        icon: '🍽️',
        available: true,
      },
      {
        id: '2',
        title: 'Catering Services',
        description: 'Order catering for your events. We provide customized menus for parties and gatherings.',
        icon: '🎉',
        available: true,
      },
      {
        id: '3',
        title: 'Private Dining',
        description: 'Book our private dining room for special occasions and business meetings.',
        icon: '🏛️',
        available: true,
      },
      {
        id: '4',
        title: 'Chef Special',
        description: 'Request a custom dish prepared by our chef. Available with 24 hours notice.',
        icon: '👨‍🍳',
        available: true,
      },
      {
        id: '5',
        title: 'Delivery Tracking',
        description: 'Track your order in real-time from kitchen to your doorstep.',
        icon: '📦',
        available: true,
      },
      {
        id: '6',
        title: 'Customer Support',
        description: 'Get help with your orders, reservations, or any inquiries.',
        icon: '💬',
        available: true,
      },
    ],
    []
  );

  // ========== Handlers ==========

  const handleServicePress = useCallback((service: Service) => {
    if (service.available) {
      Alert.alert(service.title, service.description);
    } else {
      Alert.alert('Service Unavailable', 'This service is currently not available.');
    }
  }, []);

  // ========== Styles ==========
  const styles = useMemo(
    () => createStyles(colors, spacing, borderRadius),
    [colors, spacing, borderRadius]
  );

  if (!colors || !spacing || !borderRadius) {
    return null;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      {/* Screen Header */}
      <ScreenHeader title="Service" />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>
          Our Services
        </AppText>

        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handleServicePress(service)}
            disabled={!service.available}
            style={[
              styles.serviceCard,
              service.available ? styles.serviceCardAvailable : styles.serviceCardUnavailable,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.serviceCardHeader}>
              {service.icon && (
                <AppText style={styles.serviceIcon}>
                  {service.icon}
                </AppText>
              )}
              <View style={styles.serviceCardDetails}>
                <AppText style={styles.serviceTitle}>
                  {service.title}
                </AppText>
                {!service.available && (
                  <AppText style={styles.unavailableText}>
                    Currently Unavailable
                  </AppText>
                )}
              </View>
            </View>

            <AppText style={styles.serviceDescription}>
              {service.description}
            </AppText>
          </TouchableOpacity>
        ))}

        {services.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <AppText style={styles.emptyStateText}>
              No services available at the moment
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceScreen;

