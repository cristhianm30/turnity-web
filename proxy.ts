import { type NextRequest, NextResponse } from "next/server";

const TOKEN_KEY = "turnity_auth_token";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];
  const pathname = request.nextUrl.pathname;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    // If user is already logged in, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes require a token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
