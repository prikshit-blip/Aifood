import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from '../storage';

/**
 * Tenant Interface
 */
export interface Tenant {
  id: string;
  domain: string;
  name: string;
  logo?: string;
  baseUrl: string;
  storeId: number;
  storeUuid: string;
  businessId: number;
  features?: {
    dineIn?: boolean;
    pickup?: boolean;
    delivery?: boolean;
    tableBooking?: boolean;
    loyalty?: boolean;
  };
}

/**
 * Tenant State Interface
 */
interface TenantState {
  // State
  tenant: Tenant | null;
  isLoading: boolean;
  
  // Actions
  setTenant: (tenant: Tenant) => void;
  updateTenant: (updates: Partial<Tenant>) => void;
  clearTenant: () => void;
  hasFeature: (feature: keyof Tenant['features']) => boolean;
}

/**
 * Tenant Store
 * Manages multi-tenant configuration
 * Auto-persisted to MMKV
 */
export const useTenantStore = create<TenantState>()(
  persist(
    immer((set, get) => ({
      // ========== STATE ==========
      tenant: null,
      isLoading: false,
      
      // ========== ACTIONS ==========
      
      /**
       * Set tenant data
       */
      setTenant: (tenant) => {
        set((state) => {
          state.tenant = tenant;
          state.isLoading = false;
        });
      },
      
      /**
       * Update specific tenant fields
       */
      updateTenant: (updates) => {
        set((state) => {
          if (state.tenant) {
            state.tenant = { ...state.tenant, ...updates };
          }
        });
      },
      
      /**
       * Clear tenant data
       */
      clearTenant: () => {
        set((state) => {
          state.tenant = null;
        });
      },
      
      /**
       * Check if tenant has a specific feature enabled
       */
      hasFeature: (feature) => {
        const { tenant } = get();
        return tenant?.features?.[feature] ?? false;
      },
    })),
    {
      name: 'tenant-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selectors
export const selectTenant = (state: TenantState) => state.tenant;
export const selectTenantDomain = (state: TenantState) => state.tenant?.domain;
export const selectTenantBaseUrl = (state: TenantState) => state.tenant?.baseUrl;

