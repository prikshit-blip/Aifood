// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { useTheme } from '../../hooks/useTheme';
// import { BottomTabNavigatorProps, TabItem } from '../../types/home';
// import AppText from '../ui/AppText';
// import { ICONS, IMAGES } from '../../assests';
// import AppImage from '../ui/AppImage';
// import FastImage from 'react-native-fast-image';


// // Tab Icons (using emojis as fallback - in production, use react-native-vector-icons)
// const TAB_ICONS: Record<TabItem, string> = {
//   Home: ICONS.Home,
//   Promos: ICONS.Promos,
//   Service: ICONS.Service,
//   Gift: ICONS.Gift,
//   Cart: ICONS.Cart,
// };

// const TAB_LABELS: Record<TabItem, string> = {
//   Home: 'Home',
//   Promos: 'Promos',
//   Service: 'Service',
//   Gift: 'Gift',
//   Cart: 'Cart',
// };

// const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
//   activeTab,
//   onTabPress,
//   cartItemCount = 0,
// }) => {
//   const { colors, spacing, borderRadius } = useTheme();

//   if (!colors || !spacing || !borderRadius) {
//     return null;
//   }

//   const tabs: TabItem[] = ['Home', 'Promos', 'Service', 'Gift', 'Cart'];

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           backgroundColor: colors.whiteBackground || '#FFFFFF',
//           paddingTop: spacing.sm || 8,
//           paddingBottom: spacing.md || 16,
//           // borderTopWidth: 1,
//           // borderTopColor: colors.greyBackground || '#F5F5F5',
//         },
//       ]}
//     >
//       <View style={[styles.tabsRow, { paddingHorizontal: spacing.md || 16 }]}>
//         {tabs.map((tab) => {
//           const isActive = activeTab === tab;
//           const isCart = tab === 'Cart';

//           return (
//             <TouchableOpacity
//               key={tab}
//               onPress={() => onTabPress(tab)}
//               style={[
//                 styles.tab,
//                 {
//                   paddingVertical: spacing.xs || 4,
//                   paddingHorizontal: spacing.xs || 4,
//                   borderRadius: borderRadius.sm || 4,
//                 },
//               ]}
//               activeOpacity={0.7}
//             >
//               <View style={styles.iconContainer}>
//                 <FastImage style={{width:24, height:24}} 
//                   source={TAB_ICONS[tab]} 
//                   resizeMode="contain"
//                  />
               
                
//                 {/* <AppText style={{ fontSize: 24 }}>{tab}1</AppText> */}
//                 {isCart && cartItemCount > 0 && (
//                   <View
//                     style={[
//                       styles.badge,
//                       {
//                         backgroundColor: colors.error || '#FF4444',
//                         minWidth: 18,
//                         height: 18,
//                         borderRadius: 9,
//                       },
//                     ]}
//                   >
//                     <AppText
//                       style={{
//                         fontSize: 10,
//                         fontWeight: '700',
//                         color: colors.whiteText || '#FFFFFF',
//                       }}
//                     >
//                       {cartItemCount > 99 ? '99+' : cartItemCount}
//                     </AppText>
//                   </View>
//                 )}
//               </View>
//               <AppText
//                 style={{
//                   fontSize: 12,
//                   fontWeight: isActive ? '600' : '400',
//                   color: isActive
//                     ? colors.primary || '#FF6B35'
//                     : colors.greyText || '#666666',
//                   marginTop: spacing.xs || 4,
//                 }}
//               >
//                 {TAB_LABELS[tab]}
//               </AppText>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     shadowColor: "#000000",
//     shadowOffset: { width: 0, height: 90 },
//     shadowOpacity: 1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   tabsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   tab: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   iconContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   badge: {
//     position: 'absolute',
//     top: -4,
//     right: -8,
//     minWidth: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//     borderRadius: 9,
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
// });

// export default BottomTabNavigator;

