import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

/**
 * MMKV Storage Instance
 * - 30x faster than AsyncStorage
 * - Synchronous API
 * - Encryption support
 */
export const storage = new MMKV({
  id: 'aifood-storage',
  // TODO: In production, get encryption key from secure storage (Keychain/KeyStore)
  // For now using a static key - CHANGE THIS IN PRODUCTION
  encryptionKey: 'aifood-app-encryption-key-2024',
});

/**
 * Zustand Storage Adapter
 * Allows Zustand to use MMKV for persistence
 */
export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};

/**
 * Storage Utilities
 * Direct MMKV access for non-store data
 */
export const storageUtils = {
  // Clear all storage (useful for logout)
  clearAll: () => storage.clearAll(),
  
  // Get all storage keys
  getAllKeys: () => storage.getAllKeys(),
  
  // Check if key exists
  contains: (key: string) => storage.contains(key),
  
  // Direct string operations
  setString: (key: string, value: string) => storage.set(key, value),
  getString: (key: string) => storage.getString(key),
  
  // Direct number operations
  setNumber: (key: string, value: number) => storage.set(key, value),
  getNumber: (key: string) => storage.getNumber(key),
  
  // Direct boolean operations
  setBoolean: (key: string, value: boolean) => storage.set(key, value),
  getBoolean: (key: string) => storage.getBoolean(key),
  
  // JSON operations (for complex objects)
  setJSON: (key: string, value: any) => {
    storage.set(key, JSON.stringify(value));
  },
  getJSON: <T = any>(key: string): T | null => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  
  // Delete a key
  delete: (key: string) => storage.delete(key),
};
