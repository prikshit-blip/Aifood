import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

/**
 * Helper function to check if a navigator is a drawer navigator
 */
const isDrawerNavigator = (nav: NavigationProp<any> | undefined): boolean => {
  if (!nav) return false;
  
  try {
    const state = (nav as any).getState?.();
    return state?.type === 'drawer';
  } catch {
    return false;
  }
};

/**
 * Helper function to find the drawer navigator by traversing up the navigation hierarchy
 * 
 * @param nav - The navigation object to start searching from
 * @returns The drawer navigator if found, null otherwise
 */
const findDrawerNavigator = (nav: NavigationProp<any> | undefined): NavigationProp<any> | null => {
  if (!nav) return null;
  
  // Try to find drawer navigator by checking each parent
  let currentNav: NavigationProp<any> | undefined = nav;
  
  // Traverse up to 3 levels (Stack -> Drawer -> Bottom Tabs -> Screen)
  for (let i = 0; i < 3 && currentNav; i++) {
    if (isDrawerNavigator(currentNav)) {
      return currentNav;
    }
    currentNav = currentNav.getParent();
  }
  
  return null;
};

/**
 * Helper function to get the drawer navigator from the current navigation context
 * This function tries multiple strategies to find the drawer navigator
 */
const getDrawerNavigator = (navigation: NavigationProp<any>): NavigationProp<any> | null => {
  // Strategy 1: Try direct parent first (should be DrawerNavigator for screens in BottomTabs)
  let drawerNavigation = navigation.getParent();
  
  // If parent exists, verify it's actually a drawer navigator
  if (drawerNavigation && isDrawerNavigator(drawerNavigation)) {
    return drawerNavigation;
  }
  
  // Strategy 2: If parent is not a drawer, try parent's parent
  if (drawerNavigation) {
    const parentParent = drawerNavigation.getParent();
    if (parentParent && isDrawerNavigator(parentParent)) {
      return parentParent;
    }
  }
  
  // Strategy 3: Traverse up the hierarchy to find the drawer
  return findDrawerNavigator(navigation);
};

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
   * Helper function to dispatch drawer actions
   * This centralizes the logic for finding and dispatching to the drawer navigator
   */
  const dispatchDrawerAction = useCallback(
    (actionCreator: () => ReturnType<typeof DrawerActions.openDrawer> | ReturnType<typeof DrawerActions.closeDrawer> | ReturnType<typeof DrawerActions.toggleDrawer>) => {
      const drawerNavigation = getDrawerNavigator(navigation);
      const action = actionCreator();
      
      if (drawerNavigation) {
        drawerNavigation.dispatch(action);
      } else {
        // Fallback: try direct dispatch (might work if navigation is already the drawer)
        // This is a last resort and may not work in all cases
        navigation.dispatch(action);
      }
    },
    [navigation]
  );

  /**
   * Opens the drawer menu
   */
  const openDrawer = useCallback(() => {
    dispatchDrawerAction(() => DrawerActions.openDrawer());
  }, [dispatchDrawerAction]);

  /**
   * Closes the drawer menu
   */
  const closeDrawer = useCallback(() => {
    dispatchDrawerAction(() => DrawerActions.closeDrawer());
  }, [dispatchDrawerAction]);

  /**
   * Toggles the drawer menu (open if closed, close if open)
   */
  const toggleDrawer = useCallback(() => {
    dispatchDrawerAction(() => DrawerActions.toggleDrawer());
  }, [dispatchDrawerAction]);

  return {
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};

