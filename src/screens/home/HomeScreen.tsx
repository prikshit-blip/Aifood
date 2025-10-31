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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useThemeContext } from '../../contexts/ThemeContext';
import Header from '../../components/Header';
import createStyles from './styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const user={} as any;
  const tenant={} as any;
  
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const { themeData } = useThemeContext();

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  const styles = useMemo(() => createStyles(themeData?.sections?.colors), [themeData]);

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
          {(tenant as any).features?.map((feature: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { borderLeftColor: (themeData as any).primaryColor }]}
              onPress={() => Alert.alert('Feature', `${feature} feature coming soon!`)}
            >
              <View style={[styles.featureIcon, { backgroundColor: (themeData as any).accentColor }]}>
                <Text style={styles.featureIconText}>{(tenant as any).icon || '🍽️'}</Text>
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
              { title: 'New order received', color: (themeData as any).primaryColor },
              { title: 'Inventory updated', color: (themeData as any).secondaryColor },
              { title: 'Customer feedback received', color: (themeData as any).accentColor },
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

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{(user as any)?.firstName||"user"}!</Text>
            </View>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;


