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
  return headers;
}

async function handleProxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  if (!API_ORIGIN) {
    return NextResponse.json(
      { error: "Missing BACKEND_URL or NEXT_PUBLIC_API_URL" },
      { status: 500 }
    );
  }

  const { path } = await context.params;
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
