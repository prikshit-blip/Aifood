// Tenant Configuration for Multi-Tenant SaaS
export interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  icon?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  description: string;
  features: string[];
  isActive: boolean;
}

export const TENANT_CONFIGS: TenantConfig[] = [
  {
    id: 'aifood-main',
    name: 'AIFood',
    subdomain: 'main',
    logo: 'https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=AI',
    icon: '🍽️',
    primaryColor: '#FF6B35',
    secondaryColor: '#FF8C42',
    accentColor: '#FFB366',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    description: 'Smart Food Solutions Platform',
    features: ['AI Menu Planning', 'Inventory Management', 'Order Tracking', 'Analytics'],
    isActive: true,
  },
  {
    id: 'restaurant-chain',
    name: 'FoodChain Pro',
    subdomain: 'foodchain',
    logo: 'https://via.placeholder.com/120x120/2E8B57/FFFFFF?text=FC',
    icon: '🏪',
    primaryColor: '#2E8B57',
    secondaryColor: '#3CB371',
    accentColor: '#90EE90',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    description: 'Restaurant Chain Management',
    features: ['Multi-Location', 'Staff Management', 'Supply Chain', 'Reporting'],
    isActive: true,
  },
  {
    id: 'cafe-manager',
    name: 'Cafe Manager',
    subdomain: 'cafe',
    logo: 'https://via.placeholder.com/120x120/8B4513/FFFFFF?text=CM',
    icon: '☕',
    primaryColor: '#8B4513',
    secondaryColor: '#A0522D',
    accentColor: '#D2691E',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    description: 'Cafe Management System',
    features: ['Coffee Tracking', 'Customer Loyalty', 'Inventory', 'Staff Scheduling'],
    isActive: true,
  },
  {
    id: 'food-delivery',
    name: 'QuickDelivery',
    subdomain: 'delivery',
    logo: 'https://via.placeholder.com/120x120/FF4500/FFFFFF?text=QD',
    icon: '🚚',
    primaryColor: '#FF4500',
    secondaryColor: '#FF6347',
    accentColor: '#FF7F50',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    description: 'Food Delivery Platform',
    features: ['Order Management', 'Driver Tracking', 'Customer App', 'Payment Processing'],
    isActive: true,
  },
];

// Helper functions for tenant management
export const getTenantBySubdomain = (subdomain: string): TenantConfig | undefined => {
  return TENANT_CONFIGS.find(tenant => tenant.subdomain === subdomain);
};

export const getTenantById = (id: string): TenantConfig | undefined => {
  return TENANT_CONFIGS.find(tenant => tenant.id === id);
};

export const getAllActiveTenants = (): TenantConfig[] => {
  return TENANT_CONFIGS.filter(tenant => tenant.isActive);
};

export const getTenantBranding = (tenantId: string) => {
  const tenant = getTenantById(tenantId);
  return {
    primaryColor: tenant?.primaryColor || '#FF6B35',
    secondaryColor: tenant?.secondaryColor || '#FF8C42',
    accentColor: tenant?.accentColor || '#FFB366',
    backgroundColor: tenant?.backgroundColor || '#FFFFFF',
    textColor: tenant?.textColor || '#333333',
    logo: tenant?.logo,
    icon: tenant?.icon,
  };
};
