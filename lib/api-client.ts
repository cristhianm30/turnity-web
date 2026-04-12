import { getAuthCookie } from "./cookies";

// Provided via next.config.ts
const API_URL = process.env.TURNITY_API_URL;

if (!API_URL && typeof window !== "undefined") {
  console.error("❌ TURNITY_API_URL is NOT defined. Check your .env.local and next.config.ts");
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  isPublic?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  { method = "GET", body, headers = {}, isPublic = false }: RequestOptions = {}
): Promise<T> {
  const token = getAuthCookie();
  
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token && !isPublic) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // If API_URL is missing, it will use absolute paths which might hit 3000
  // We force a check here
  const fullUrl = API_URL ? `${API_URL}${endpoint}` : endpoint;

  const response = await fetch(fullUrl, {
    method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    
    if (response.status === 401 && !isPublic) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-unauthorized"));
      }
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
