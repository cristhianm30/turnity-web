import { NextResponse, type NextRequest } from "next/server";

const API_URL = process.env.TURNITY_API_URL;

interface BackendCallbackResponse {
  success: boolean;
  data?: {
    token?: {
      token?: string;
    };
    user?: unknown;
  };
}

export async function GET(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.redirect(new URL("/login?error=missing_api_url", request.url));
  }

  const backendCallbackUrl = new URL(`${API_URL}/auth/callback/google`);
  backendCallbackUrl.search = request.nextUrl.search;

  try {
    const response = await fetch(backendCallbackUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL(`/login?error=google_oauth_failed&status=${response.status}`, request.url));
    }

    const payload = (await response.json()) as BackendCallbackResponse;
    const token = payload.data?.token?.token;
    const user = payload.data?.user;

    if (!payload.success || !token || !user) {
      return NextResponse.redirect(new URL("/login?error=invalid_oauth_response", request.url));
    }

    // Build success URL with encoded params
    const successUrl = new URL("/auth/google/success", request.url);
    successUrl.searchParams.set("token", token);
    successUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(user)));

    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error("Google callback error:", error);
    return NextResponse.redirect(new URL("/login?error=google_oauth_exception", request.url));
  }
}
