import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE_KEY = "token";
const LOCALE_COOKIE_KEY = "locale";
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = new Set(["en", "ar"]);
const API_ORIGIN = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/$/, "");

type MeResponse = {
  is_admin?: boolean;
  user?: { is_admin?: boolean };
  data?: {
    is_admin?: boolean;
    user?: { is_admin?: boolean };
  };
};

type SupportedLocale = "en" | "ar";

function isSupportedLocale(locale: string | undefined): locale is SupportedLocale {
  return !!locale && SUPPORTED_LOCALES.has(locale);
}

function resolveLocale(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;
  if (isSupportedLocale(cookieLocale)) return cookieLocale;
  return DEFAULT_LOCALE;
}

function shouldBypassMiddleware(pathname: string): boolean {
  const isAssetRequest = /\.[^/]+$/.test(pathname);
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    isAssetRequest
  );
}

function extractIsAdmin(payload: MeResponse | null): boolean {
  if (!payload) return false;
  if (typeof payload.is_admin === "boolean") return payload.is_admin;
  if (typeof payload.user?.is_admin === "boolean") return payload.user.is_admin;
  if (typeof payload.data?.is_admin === "boolean") return payload.data.is_admin;
  if (typeof payload.data?.user?.is_admin === "boolean") return payload.data.user.is_admin;
  return false;
}

async function getIsAdmin(token: string, lang: string): Promise<boolean> {
  if (!API_ORIGIN) return false;

  try {
    const response = await fetch(`${API_ORIGIN}/api/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Lang: lang,
        "Accept-Language": lang,
      },
      cache: "no-store",
    });

    if (!response.ok) return false;
    const payload = (await response.json().catch(() => null)) as MeResponse | null;
    return extractIsAdmin(payload);
  } catch {
    return false;
  }
}

function redirectToAdminLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const localePrefix = parts[0] && SUPPORTED_LOCALES.has(parts[0]) ? `/${parts[0]}` : "";
  loginUrl.pathname = `${localePrefix}/admin-login`;
  loginUrl.search = "";
  loginUrl.searchParams.set("from", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(TOKEN_COOKIE_KEY);
  return response;
}

function withDefaultLocaleCookie(request: NextRequest, response: NextResponse): NextResponse {
  if (!isSupportedLocale(request.cookies.get(LOCALE_COOKIE_KEY)?.value)) {
    response.cookies.set(LOCALE_COOKIE_KEY, DEFAULT_LOCALE, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (shouldBypassMiddleware(pathname)) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = parts[0] ? SUPPORTED_LOCALES.has(parts[0]) : false;
  const routeIndex = hasLocalePrefix ? 1 : 0;
  const route = parts[routeIndex] || "";
  const localePrefix = hasLocalePrefix ? `/${parts[0]}` : "";

  const isAuthRoute = route === "auth";
  const isAdminRoute = route === "admin";
  const isAdminLoginRoute = route === "admin-login";
  const token = request.cookies.get(TOKEN_COOKIE_KEY)?.value;

  if (isAuthRoute && token) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = `${localePrefix}/` || "/";
    homeUrl.search = "";
    return withDefaultLocaleCookie(request, NextResponse.redirect(homeUrl));
  }

  if (!isAdminRoute && !isAdminLoginRoute) {
    return withDefaultLocaleCookie(request, NextResponse.next());
  }

  if (!token) {
    return isAdminRoute
      ? withDefaultLocaleCookie(request, redirectToAdminLogin(request))
      : withDefaultLocaleCookie(request, NextResponse.next());
  }

  const lang = resolveLocale(request);
  const isAdmin = await getIsAdmin(token, lang);

  if (!isAdmin) {
    return isAdminRoute
      ? withDefaultLocaleCookie(request, redirectToAdminLogin(request))
      : withDefaultLocaleCookie(request, NextResponse.next());
  }

  if (isAdminLoginRoute) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = `${localePrefix}/admin`;
    adminUrl.search = "";
    return withDefaultLocaleCookie(request, NextResponse.redirect(adminUrl));
  }

  return withDefaultLocaleCookie(request, NextResponse.next());
}

export const config = {
  matcher: ["/:path*"],
};
