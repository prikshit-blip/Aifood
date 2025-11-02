import apiClient from '../client';
import { useTenantStore } from '../../store/stores/tenantStore';

// ========== Menu API Types ==========
export interface MenuTag {
  id: number;
  icon: string;
  name: string;
  icon_id: number | null;
  tag_text: string | null;
  icon_type: number | null;
  icon_color: string | null;
  sequence_id: number;
  tag_text_color: string;
  tag_text_background: string | null;
  icon_background_color: string | null;
}

export interface MenuCategory {
  category_id: number;
  category_name: string;
  category_sequence_id: number;
}

export interface MenuItem {
  menu_id: number;
  menu_name: string;
  categories: MenuCategory[];
  menu_sequence_id: number;
}

export interface MenuData {
  tags: MenuTag[];
  uuid: string;
  menus: MenuItem[];
  status: number;
  message: string;
  store_id: number;
  business_id: number;
}

// Menu API Response Structure
export interface MenuApiResponse {
  status: number;
  code?: string;
  message: string;
  data: MenuData;
  requestId?: string;
}

/**
 * Get store menu from API
 * @returns Menu data including tags, menus, and categories
 */
export const getMenuApi = async (): Promise<MenuData> => {
  // Get domain from tenant store
  const tenant = useTenantStore.getState().tenant;
  const domain = tenant?.domain || 'demo.theaihostess.com';
  
  // Menu API uses same URL pattern as theme API
  // Use absolute URL to trigger absolute URL detection in interceptor
  const url = `https://${domain}/cp/api/store/menu`;
  
  // Use apiClient - it will automatically:
  // 1. Detect absolute URL and skip baseURL
  // 2. Add session cookies
  // 3. Add auth token
  // 4. Handle errors
  
  // Note: apiClient returns response.data directly, so we get MenuApiResponse
  const apiResponse = await apiClient.get<MenuApiResponse>(url);

  console.log('📋 Menu API Response:');
  console.log('  - Status:', apiResponse.status);
  // console.log('  - Menus count:', apiResponse.data.menus?.length || 0);
  // console.log('  - Tags count:', apiResponse.data.tags?.length || 0);
  
  // Extract and return menu data
  return apiResponse.data as any;
};

