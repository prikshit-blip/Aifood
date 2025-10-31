import { useCallback } from 'react';
import { useAuthStore, AuthState } from '../store/stores/authStore';
import { useUserStore, User } from '../store/stores/userStore';

/**
 * High-level auth hook
 * Simplifies auth operations across auth and user stores
 */
export const useAuth = () => {
  const isAuthenticated = useAuthStore((state: AuthState) => state.isAuthenticated);
  const token = useAuthStore((state: AuthState) => state.token);
  const authLogin = useAuthStore((state: AuthState) => state.login);
  const authLogout = useAuthStore((state: AuthState) => state.logout);
  
  const user = useUserStore((state: any) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);
  const clearUser = useUserStore((state: any) => state.clearUser);
  
  /**
   * Complete login (auth + user)
   */
  const login = useCallback(
    (token: string, refreshToken: string, expiresIn: number, userData: User) => {
      authLogin(token, refreshToken, expiresIn);
      setUser(userData);
    },
    [authLogin, setUser]
  );
  
  /**
   * Complete logout (auth + user)
   */
  const logout = useCallback(() => {
    authLogout();
    clearUser();
  }, [authLogout, clearUser]);
  
  return {
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };
};

