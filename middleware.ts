import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Adjust these to your real auth routes
const PUBLIC_AUTH_PATHS = ["/auth"];

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PATHS.includes(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO: replace "auth_token" with whatever cookie / mechanism you use
  const token = request.cookies.get("auth_token")?.value;
  const isLoggedIn = !!token;

  const isAuthRoute = isPublicAuthPath(pathname);

  // Example: treat "/app" and "/dashboard" as protected app areas
  const isProtectedRoute =
    pathname.startsWith("/app") || pathname.startsWith("/dashboard");

  // 1) Block anonymous users from protected routes
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2) Prevent logged‑in users from visiting auth pages
  if (isLoggedIn && isAuthRoute) {
    const appUrl = new URL("/dashboard", request.url); // or "/app"
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
}

// Only run the middleware on relevant paths.
// Update these matchers when you add actual routes under (auth) and (app).
export const config = {
  matcher: [
    "/login",
    "/register",
    "/app/:path*",
    "/dashboard/:path*",
  ],
};

