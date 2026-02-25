import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/$/, "");

function buildTargetUrl(pathSegments: string[], request: NextRequest): string {
  const targetPath = `/${pathSegments.join("/")}`;
  const query = request.nextUrl.search;
  return `${API_ORIGIN}${targetPath}${query}`;
}

function copyRequestHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("origin");
  headers.delete("content-length");
  headers.delete("cookie");

  const lang =
    request.headers.get("lang") ||
    request.cookies.get("locale")?.value ||
    process.env.LANG ||
    "en";

  headers.set("Lang", lang);
  headers.set("Accept-Language", lang);

  const token =
    request.cookies.get("__Host-token")?.value ||
    request.cookies.get("token")?.value;
  if (token && !headers.get("authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

function extractIsAdmin(payload: any): boolean {
  return Boolean(
    payload?.is_admin ??
    payload?.user?.is_admin ??
    payload?.data?.is_admin ??
    payload?.data?.user?.is_admin
  );
}

async function ensureAdmin(request: NextRequest): Promise<boolean> {
  const token =
    request.cookies.get("__Host-token")?.value ||
    request.cookies.get("token")?.value;
  if (!token || !API_ORIGIN) return false;

  const lang = request.cookies.get("locale")?.value || "en";

  try {
    const meResponse = await fetch(`${API_ORIGIN}/api/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Lang: lang,
        "Accept-Language": lang,
      },
      cache: "no-store",
    });
    if (!meResponse.ok) return false;
    const payload = await meResponse.json().catch(() => null);
    return extractIsAdmin(payload);
  } catch {
    return false;
  }
}

async function handleProxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  if (!API_ORIGIN) {
    return NextResponse.json(
      { error: "Missing BACKEND_URL or NEXT_PUBLIC_API_URL" },
      { status: 500 }
    );
  }

  const { path } = await context.params;
  const isAdminPath = path[0] === "admin";
  if (isAdminPath) {
    const canAccessAdmin = await ensureAdmin(request);
    if (!canAccessAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const targetUrl = buildTargetUrl(path, request);
  const method = request.method;
  const hasBody = !["GET", "HEAD"].includes(method);

  const upstreamResponse = await fetch(targetUrl, {
    method,
    headers: copyRequestHeaders(request),
    body: hasBody ? await request.text() : undefined,
    cache: "no-store",
    redirect: "manual",
  });

  const responseHeaders = new Headers(upstreamResponse.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, context);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, context);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, context);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, context);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, context);
}
