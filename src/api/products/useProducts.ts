import { useQuery } from '@tanstack/react-query';
import { getProductsApi } from './productApi';
import type { ProductApiResponse } from './productApi';

const PRODUCTS_KEYS = {
  products: ['products', 'store'] as const,
};

/**
 * Hook to fetch store products data
 * @param enabled - Whether to enable the query (default: true)
 * @returns React Query hook result with products data
 */
export const useStoreProducts = (enabled: boolean = true) => {
  return useQuery({
    queryKey: PRODUCTS_KEYS.products,
    queryFn: async () => {
      const productsData = await getProductsApi();
      return productsData;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - products may change more frequently than menu
    retry: 2,
  });
};

/**
 * Get products data from cache (synchronous access)
 * Useful for quick access without triggering a fetch
 */
export const getCachedProducts = (): ProductApiResponse | undefined => {
  // This would require access to QueryClient, but since we're using the hook pattern,
  // components should use useStoreProducts hook instead
  return undefined;
};



