import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TENANT_CONFIGS, TenantConfig } from '../config/tenantConfig';
import { RootStackParamList } from '../navigation/types';

type TenantSelectorNavigationProp = StackNavigationProp<RootStackParamList, 'TenantSelector'>;

interface TenantSelectorProps {
  navigation: TenantSelectorNavigationProp;
}

const TenantSelector: React.FC<TenantSelectorProps> = ({ navigation }) => {
  const [selectedTenant, setSelectedTenant] = useState<TenantConfig | null>(null);

  const handleTenantSelect = () => {
    if (!selectedTenant) {
      Alert.alert('Error', 'Please select a tenant');
      return;
    }
    navigation.navigate('SignIn', { tenant: selectedTenant });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Platform</Text>
        <Text style={styles.subtitle}>
          Select the tenant you want to access
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tenantList}>
          {TENANT_CONFIGS.map((tenant) => (
            <TouchableOpacity
              key={tenant.id}
              style={[
                styles.tenantCard,
                selectedTenant?.id === tenant.id && styles.selectedTenantCard,
                { borderColor: tenant.primaryColor },
                selectedTenant?.id === tenant.id && {
                  backgroundColor: `${tenant.primaryColor}10`,
                },
              ]}
              onPress={() => setSelectedTenant(tenant)}
            >
              <View style={styles.tenantCardContent}>
                <View style={styles.tenantLogo}>
                  {tenant.logo ? (
                    <Image
                      source={{ uri: tenant.logo }}
                      style={styles.tenantLogoImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <View
                      style={[
                        styles.tenantLogoPlaceholder,
                        { backgroundColor: tenant.primaryColor },
                      ]}
                    >
                      <Text style={styles.tenantLogoText}>
                        {tenant.icon || '🍽️'}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.tenantInfo}>
                  <Text style={[styles.tenantName, { color: tenant.primaryColor }]}>
                    {tenant.name}
                  </Text>
                  <Text style={styles.tenantDescription}>
                    {tenant.description}
                  </Text>
                  <Text style={styles.tenantSubdomain}>
                    {tenant.subdomain}.aifood.com
                  </Text>
                </View>

                <View style={styles.tenantFeatures}>
                  {tenant.features.slice(0, 2).map((feature, index) => (
                    <View
                      key={index}
                      style={[
                        styles.featureTag,
                        { backgroundColor: `${tenant.primaryColor}20` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.featureTagText,
                          { color: tenant.primaryColor },
                        ]}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                  {tenant.features.length > 2 && (
                    <View style={styles.moreFeatures}>
                      <Text style={styles.moreFeaturesText}>
                        +{tenant.features.length - 2} more
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {selectedTenant?.id === tenant.id && (
                <View style={[styles.selectedIndicator, { backgroundColor: tenant.primaryColor }]}>
                  <Text style={styles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedTenant && { backgroundColor: selectedTenant.primaryColor },
            !selectedTenant && styles.disabledButton,
          ]}
          onPress={handleTenantSelect}
          disabled={!selectedTenant}
        >
          <Text style={styles.continueButtonText}>
            Continue with {selectedTenant?.name || 'Selected Tenant'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tenantList: {
    paddingBottom: 20,
  },
  tenantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  selectedTenantCard: {
    borderWidth: 3,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  tenantCardContent: {
    padding: 20,
  },
  tenantLogo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  tenantLogoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  tenantLogoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenantLogoText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  tenantInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  tenantName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tenantDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
  },
  tenantSubdomain: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  tenantFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreFeatures: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  moreFeaturesText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TenantSelector;
