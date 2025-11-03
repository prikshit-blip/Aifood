import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { DrawerParamList } from '../navigation/DrawerNavigator';

/**
 * Custom hook to access drawer navigation from nested screens
 * 
 * This hook abstracts the drawer navigation access pattern for screens
 * that are nested deep in the navigation hierarchy (e.g., screens inside bottom tabs).
 * 
 * Navigation Hierarchy:
 * Stack -> Drawer -> Bottom Tabs -> Screen
 * 
 * @returns Object with methods to interact with the drawer
 */
export const useDrawerNavigation = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  /**
   * Opens the drawer menu
   */
  const openDrawer = useCallback(() => {
    // For nested navigators, we need to access the drawer navigator
    // which is typically the parent of the parent (Stack -> Drawer -> Bottom Tabs)
    const drawerNavigation = navigation.getParent()?.getParent();
    if (drawerNavigation) {
      drawerNavigation.dispatch(DrawerActions.openDrawer());
    } else {
      // Fallback: try direct dispatch (in case navigation structure changes)
      navigation.dispatch(DrawerActions.openDrawer());
    }
  }, [navigation]);

  /**
   * Closes the drawer menu
   */
  const closeDrawer = useCallback(() => {
    const drawerNavigation = navigation.getParent()?.getParent();
    if (drawerNavigation) {
      drawerNavigation.dispatch(DrawerActions.closeDrawer());
    } else {
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  }, [navigation]);

  /**
   * Toggles the drawer menu (open if closed, close if open)
   */
  const toggleDrawer = useCallback(() => {
    const drawerNavigation = navigation.getParent()?.getParent();
    if (drawerNavigation) {
      drawerNavigation.dispatch(DrawerActions.toggleDrawer());
    } else {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }
  }, [navigation]);

  return {
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};

