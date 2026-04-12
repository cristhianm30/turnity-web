"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  setAuthCookie,
  getAuthCookie,
  clearAuthCookie,
} from "@/lib/cookies";
import { apiClient } from "@/lib/api-client";
import type { User, LoginRequest, RegisterRequest, LoginResponse } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "turnity_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    clearAuthCookie();
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: credentials,
        isPublic: true,
      });

      const actualToken = response.data.token.token;
      const actualUser = response.data.user;

      setAuthCookie(actualToken);
      localStorage.setItem(USER_KEY, JSON.stringify(actualUser));
      setToken(actualToken);
      setUser(actualUser);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient<LoginResponse>("/auth/register", {
        method: "POST",
        body: credentials,
        isPublic: true,
      });

      const actualToken = response.data.token.token;
      const actualUser = response.data.user;

      setAuthCookie(actualToken);
      localStorage.setItem(USER_KEY, JSON.stringify(actualUser));
      setToken(actualToken);
      setUser(actualUser);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize auth state from cookies/localStorage on mount
  useEffect(() => {
    const storedToken = getAuthCookie();
    const storedUser = typeof window !== "undefined" ? localStorage.getItem(USER_KEY) : null;

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored data, clear it
        clearAuthCookie();
        localStorage.removeItem(USER_KEY);
      }
    }

    setIsLoading(false);

    // Watch for unauthorized events from api-client
    const handleUnauthorized = () => {
      logout();
      window.location.href = "/login";
    };

    window.addEventListener("auth-unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth-unauthorized", handleUnauthorized);
  }, [logout]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
