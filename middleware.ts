import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE_KEY = "token";
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
  loginUrl.pathname = "/admin-login";
  loginUrl.search = "";
  loginUrl.searchParams.set("from", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(TOKEN_COOKIE_KEY);
  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin-login";

  if (!isAdminRoute && !isAdminLoginRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_COOKIE_KEY)?.value;
  if (!token) {
    return isAdminRoute ? redirectToAdminLogin(request) : NextResponse.next();
  }

  const lang = request.cookies.get("locale")?.value || process.env.LANG || "en";
  const isAdmin = await getIsAdmin(token, lang);

  if (!isAdmin) {
    return isAdminRoute ? redirectToAdminLogin(request) : NextResponse.next();
  }

  if (isAdminLoginRoute) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
