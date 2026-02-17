import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import authService, { User } from '../api/services/authService';
import { getErrorMessage } from '../utils/errorHandler';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user has an active session on mount
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authService.getAuthStatus();
      if (response.authenticated && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Clear cache before login to ensure fresh data for new user
        queryClient.clear();
        const response = await authService.login({ email, password });
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          throw new Error(response.message || 'Login failed');
        }
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error) || 'Login failed');
      }
    },
    [queryClient],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        // Clear cache before registration to ensure clean state
        queryClient.clear();
        const response = await authService.register({ name, email, password });
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error) || 'Registration failed');
      }
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      // Clear all React Query cache to prevent data leakage between users
      queryClient.clear();
    } catch (error: unknown) {
      console.error('Logout error:', error);
      setUser(null);
      // Clear cache even on error to ensure clean state
      queryClient.clear();
    }
  }, [queryClient]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
