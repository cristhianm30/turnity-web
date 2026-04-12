"use client";

import { useAuth } from "@/context/auth-context";

export function AuthDebug() {
  const { user, token, isAuthenticated, isLoading } = useAuth();

  if (!isLoading) {
    console.log("Auth state:", {
      isAuthenticated,
      user,
      token,
      isLoading,
    });
  }

  return null;
}
