import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mmkvStorage } from '../storage';

/**
 * Session Interface
 */
export interface Session {
  sid: string | null;
  cookies: string | null;
  storeId: number | null;
  storeUuid: string | null;
  businessId: number | null;
  themeId: number | null;
  domain: string | null;
  lastUpdated: number;
}

/**
 * Session State Interface
 */
interface SessionState {
  // State
  session: Session | null;
  
  // Actions
  setSession: (session: Partial<Session>) => void;
  updateSession: (updates: Partial<Session>) => void;
  clearSession: () => void;
  getSid: () => string | null;
  getCookies: () => string | null;
  isSessionValid: () => boolean;
}

/**
 * Session Store
 * Manages session data including sid (session ID) from theme API
 * This sid must be included in all subsequent API calls
 * Auto-persisted to MMKV
 */
export const useSessionStore = create<SessionState>()(
  persist(
    immer((set, get) => ({
      // ========== STATE ==========
      session: null,
      
      // ========== ACTIONS ==========
      
      /**
       * Set complete session data (from theme API response)
       */
      setSession: (sessionData) => {
        set((state) => {
          state.session = {
            sid: sessionData.sid || null,
            cookies: sessionData.cookies || null,
            storeId: sessionData.storeId || null,
            storeUuid: sessionData.storeUuid || null,
            businessId: sessionData.businessId || null,
            themeId: sessionData.themeId || null,
            domain: sessionData.domain || null,
            lastUpdated: Date.now(),
          };
        });
      },
      
      /**
       * Update specific session fields
       */
      updateSession: (updates) => {
        set((state) => {
          if (state.session) {
            state.session = {
              ...state.session,
              ...updates,
              lastUpdated: Date.now(),
            };
          } else {
            state.session = {
              sid: null,
              cookies: null,
              storeId: null,
              storeUuid: null,
              businessId: null,
              themeId: null,
              domain: null,
              ...updates,
              lastUpdated: Date.now(),
            };
          }
        });
      },
      
      /**
       * Clear session data (on logout or session expiry)
       */
      clearSession: () => {
        set((state) => {
          state.session = null;
        });
      },
      
      /**
       * Get session ID (sid)
       */
      getSid: () => {
        const { session } = get();
        return session?.sid || null;
      },
      
      /**
       * Get cookies string
       */
      getCookies: () => {
        const { session } = get();
        return session?.cookies || null;
      },
      
      /**
       * Check if session is valid
       */
      isSessionValid: () => {
        const { session } = get();
        if (!session || !session.sid) return false;
        
        // Check if session is less than 24 hours old
        const MAX_SESSION_AGE = 24 * 60 * 60 * 1000; // 24 hours
        const age = Date.now() - session.lastUpdated;
        return age < MAX_SESSION_AGE;
      },
    })),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

// Selectors
export const selectSession = (state: SessionState) => state.session;
export const selectSid = (state: SessionState) => state.session?.sid;
export const selectCookies = (state: SessionState) => state.session?.cookies;

