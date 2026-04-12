import { useAuth } from "@/context/auth-context";
import { useEffect, useCallback } from "react";

/**
 * Hook para efectos secundarios basados en cambios de autenticación
 */
export function useAuthEffect(
  callback: (isAuthenticated: boolean) => void,
  dependencies: unknown[] = []
) {
  const { isAuthenticated } = useAuth();
  
  const memoizedCallback = useCallback(() => {
    callback(isAuthenticated);
  }, [isAuthenticated, callback]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback, ...dependencies]);
}
