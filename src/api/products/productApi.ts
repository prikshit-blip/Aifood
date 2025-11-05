import apiClient from '../client';
import { useTenantStore } from '../../store/stores/tenantStore';

// ========== Product API Types ==========
export interface ProductTag {
  tag_id: number;
}

export interface Product {
  tags: ProductTag[] | null;
  price: number;
  image_url: string | null;
  product_id: number;
  product_name: string;
  stock_status: boolean | null;
  product_subtitle: string;
  is_available_service_specific: boolean;
  item_available_for_service_ids: number[] | null;
}

export interface ProductsByCategory {
  [categoryId: string]: Product[];
}

export interface ProductApiResponse {
  status: number;
  message: string;
  categories: ProductsByCategory;
}

/**
 * Get store products from API
 * @returns Product data grouped by categories
 */
export const getProductsApi = async (): Promise<ProductApiResponse> => {
  // Get domain from tenant store
  const tenant = useTenantStore.getState().tenant;
  const domain = tenant?.domain || 'demo.theaihostess.com';
  
  // Products API uses same URL pattern as menu API
  // Use absolute URL to trigger absolute URL detection in interceptor
  const url = `https://${domain}/cp/api/store/products`;
  
  // Use apiClient - it will automatically:
  // 1. Detect absolute URL and skip baseURL
  // 2. Add session cookies
  // 3. Add auth token
  // 4. Handle errors
  
  // Note: apiClient returns response.data directly
  const apiResponse = await apiClient.get<ProductApiResponse>(url);

  console.log('📦 Products API Response:');
  console.log('  - Status:', apiResponse.status);
  console.log('  - Message:', apiResponse.message);
  console.log('  - Categories count:', Object.keys(apiResponse.categories || {}).length);
  
  // Count total products across all categories
  const totalProducts = Object.values(apiResponse.categories || {}).reduce(
    (sum, products) => sum + products.length,
    0
  );
  console.log('  - Total products:', totalProducts);
  
  return apiResponse;
};

