import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_AUTH_PATHS = ["/auth"];

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PATHS.includes(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin routes: require next-auth JWT with role === "admin" ---
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "admin") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // --- Existing cookie-based auth for user-facing protected routes ---
  const cookieToken = request.cookies.get("token")?.value;
  const isLoggedIn = !!cookieToken;
  const isAuthRoute = isPublicAuthPath(pathname);

  const isProtectedRoute =
    pathname.startsWith("/app") ||
    pathname.startsWith("/dashboard");

  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/auth",
    "/app/:path*",
    "/dashboard/:path*",
  ],
};
