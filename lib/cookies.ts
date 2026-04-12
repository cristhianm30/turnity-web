/**
 * Utility functions for managing authentication cookies
 * 
 * Note: These functions set HTTP cookies that are accessible to proxy
 * and persisted across browser sessions.
 */

export function setAuthCookie(token: string) {
  if (typeof document === "undefined") return;
  
  // Calculate expiration: 7 days from now
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  
  // Set cookie with secure attributes
  // Note: In production, use Secure flag for HTTPS
  document.cookie = `turnity_auth_token=${encodeURIComponent(token)}; path=/; expires=${expirationDate.toUTCString()}`;
}

export function getAuthCookie(): string | null {
  if (typeof document === "undefined") return null;
  
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((c) => c.startsWith("turnity_auth_token="));
  
  if (!tokenCookie) return null;
  
  const value = tokenCookie.split("=")[1];
  return value ? decodeURIComponent(value) : null;
}

export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  
  // Set expiration to the past to delete cookie
  document.cookie = "turnity_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

