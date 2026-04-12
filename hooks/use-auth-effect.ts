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

  const allDependencies = [memoizedCallback, ...dependencies];

  useEffect(() => {
    memoizedCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, allDependencies);
}
