import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/$/, "");

const TOKEN_COOKIE_KEY = "__Host-token";
const LEGACY_TOKEN_COOKIE_KEY = "token";

type LoginPayload = {
  token?: string;
  user?: {
    is_admin?: boolean;
  };
};

export async function POST(request: NextRequest) {
  if (!API_ORIGIN) {
    return NextResponse.json(
      { error: "Missing BACKEND_URL or NEXT_PUBLIC_API_URL" },
      { status: 500 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const email = body?.email?.trim() || "";
  const password = body?.password || "";
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const lang = request.cookies.get("locale")?.value || "en";
  const backendRes = await fetch(`${API_ORIGIN}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Lang: lang,
      "Accept-Language": lang,
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  }).catch(() => null);

  if (!backendRes || !backendRes.ok) {
    const payload = (await backendRes?.json().catch(() => null)) as { error?: string } | null;
    return NextResponse.json(
      { error: payload?.error || "Invalid credentials" },
      { status: backendRes?.status || 401 }
    );
  }

  const payload = (await backendRes.json().catch(() => null)) as LoginPayload | null;
  const token = payload?.token?.trim() || "";
  if (!token) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({
    user: payload?.user || null,
  });
  response.cookies.set({
    name: TOKEN_COOKIE_KEY,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.set({
    name: LEGACY_TOKEN_COOKIE_KEY,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.set({
    name: "logged_in",
    value: "1",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
