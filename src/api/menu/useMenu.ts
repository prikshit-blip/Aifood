import { useQuery } from '@tanstack/react-query';
import { getMenuApi } from './menuApi';
import type { MenuData } from './menuApi';

const MENU_KEYS = {
  menu: ['menu', 'store'] as const,
};

/**
 * Hook to fetch store menu data
 * @param enabled - Whether to enable the query (default: true)
 * @returns React Query hook result with menu data
 */
export const useStoreMenu = (enabled: boolean = true) => {
  return useQuery({
    queryKey: MENU_KEYS.menu,
    queryFn: async () => {
      const menuData = await getMenuApi();
      return menuData;
    },
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes - menu doesn't change frequently
    retry: 2,
  });
};

/**
 * Get menu data from cache (synchronous access)
 * Useful for quick access without triggering a fetch
 */
export const getCachedMenu = (): MenuData | undefined => {
  // This would require access to QueryClient, but since we're using the hook pattern,
  // components should use useStoreMenu hook instead
  return undefined;
};

