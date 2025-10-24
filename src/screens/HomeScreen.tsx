import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useThemeContext } from '../contexts/ThemeContext'; // ✅ Import theme hook
import Header from '../components/Header';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const user={};
  const tenant={};
  
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const { themeData } = useThemeContext(); // ✅ Use global theme

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TenantSelector' }],
    });
  };

  // ✅ Memoize styles for performance
  const styles = useMemo(() => createStyles(themeData?.sections?.colors), [themeData]);

  console.log("122222",themeData?.sections?.colors)

  const renderDashboard = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.dashboardContainer}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { borderColor: themeData.primaryColor }]}>
              <Text style={[styles.statNumber, { color: themeData.primaryColor }]}>24</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>
            <View style={[styles.statCard, { borderColor: themeData.secondaryColor }]}>
              <Text style={[styles.statNumber, { color: themeData.secondaryColor }]}>156</Text>
              <Text style={styles.statLabel}>Total Customers</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { borderColor: themeData.accentColor }]}>
              <Text style={[styles.statNumber, { color: themeData.accentColor }]}>$2,450</Text>
              <Text style={styles.statLabel}>Today's Revenue</Text>
            </View>
            <View style={[styles.statCard, { borderColor: '#4CAF50' }]}>
              <Text style={[styles.statNumber, { color: '#4CAF50' }]}>98%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Available Features</Text>
          {tenant.features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { borderLeftColor: themeData.primaryColor }]}
              onPress={() => Alert.alert('Feature', `${feature} feature coming soon!`)}
            >
              <View style={[styles.featureIcon, { backgroundColor: themeData.accentColor }]}>
                <Text style={styles.featureIconText}>{tenant.icon || '🍽️'}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature}</Text>
                <Text style={styles.featureDescription}>
                  Manage and optimize your {feature.toLowerCase()} operations
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { title: 'New order received', color: themeData.primaryColor },
              { title: 'Inventory updated', color: themeData.secondaryColor },
              { title: 'Customer feedback received', color: themeData.accentColor },
            ].map((item, index) => (
              <View style={styles.activityItem} key={index}>
                <View style={[styles.activityDot, { backgroundColor: item.color }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityTime}>Just now</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          {tenant.logo ? (
            <Image source={{ uri: tenant.logo }} style={styles.profileLogo} resizeMode="contain" />
          ) : (
            <View style={[styles.profileLogo, { backgroundColor: themeData.primaryColor }]}>
              <Text style={styles.profileLogoText}>{tenant.icon || '🍽️'}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{tenant.name}</Text>
          <Text style={styles.profileDescription}>{tenant.description}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>User Information</Text>
          {[
            { label: 'Name', value: `${user.firstName} ${user.lastName}` },
            { label: 'Email', value: user.email },
            { label: 'Tenant', value: `${tenant.name} (${tenant.subdomain}.aifood.com)` },
          ].map((item, i) => (
            <View style={styles.userInfoItem} key={i}>
              <Text style={styles.userInfoLabel}>{item.label}</Text>
              <Text style={styles.userInfoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.firstName||"user"}!</Text>
            </View>
          </View>
        </View>
      </View>

      
    </SafeAreaView>
  );
};

/**
 * ✅ Dynamic Theme-Based Styles
 */
const createStyles = (theme: any) =>
  
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.primaryColor,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      marginLeft: 15,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    welcomeText: {
      color: theme.textOnPrimary || '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    userName: {
      color: theme.textOnPrimary || '#FFF',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 4,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.tabBackground || '#F8F9FA',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    tabButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    content: { flex: 1 },
    dashboardContainer: { padding: 20 },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.textColor,
    },
    statsContainer: { marginBottom: 30 },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.cardBackground || '#FFFFFF',
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 5,
      borderWidth: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statNumber: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    statLabel: { fontSize: 14, color: theme.textColor },
    featuresContainer: { marginBottom: 30 },
    featureCard: {
      flexDirection: 'row',
      backgroundColor: theme.cardBackground || '#FFFFFF',
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      borderLeftWidth: 4,
      elevation: 3,
    },
    featureIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    featureIconText: { fontSize: 24 },
    featureTitle: { fontSize: 16, fontWeight: 'bold', color: theme.textColor },
    featureDescription: { fontSize: 14, opacity: 0.7, color: theme.textColor },
    activityContainer: { marginBottom: 30 },
    activityList: {
      backgroundColor: theme.cardBackground || '#FFFFFF',
      borderRadius: 12,
      padding: 15,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    activityDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 15,
    },
    activityContent: { flex: 1 },
    activityTitle: { fontSize: 16, fontWeight: '600', color: theme.textColor },
    activityTime: { fontSize: 12, opacity: 0.6, color: theme.textColor },
    profileContainer: { padding: 20 },
    profileHeader: { alignItems: 'center', marginBottom: 30 },
    profileLogo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    profileLogoText: { fontSize: 40, color: theme.primary_text },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.textColor,
    },
    profileDescription: {
      fontSize: 16,
      opacity: 0.7,
      textAlign: 'center',
      color: theme.textColor,
    },
    userInfo: {
      backgroundColor: theme.cardBackground || '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
    },
    userInfoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.textColor,
    },
    userInfoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    userInfoLabel: { fontSize: 16, fontWeight: '600', color: theme.textColor },
    userInfoValue: { fontSize: 16, textAlign: 'right', color: theme.textColor },
    signOutButton: {
      backgroundColor: '#FF4444',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
    },
    signOutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default HomeScreen;
