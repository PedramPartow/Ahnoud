import { NextRequest, NextResponse } from "next/server";

const API_ORIGIN = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  ""
).replace(/\/$/, "");

const TOKEN_COOKIE_KEY = "__Host-token";
const LEGACY_TOKEN_COOKIE_KEY = "token";
const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;
const FAILURE_DELAY_MS = 500;

type AttemptState = {
  count: number;
  windowStart: number;
  lockedUntil: number;
};

type LoginPayload = {
  token?: string;
  user?: {
    is_admin?: boolean;
  };
};

const attempts = new Map<string, AttemptState>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getClientKey(request: NextRequest, email: string): string {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  return `${ip}:${email.toLowerCase()}`;
}

function getAttemptState(key: string, now: number): AttemptState {
  const existing = attempts.get(key);
  if (!existing) {
    const initial = { count: 0, windowStart: now, lockedUntil: 0 };
    attempts.set(key, initial);
    return initial;
  }

  if (now - existing.windowStart > WINDOW_MS) {
    existing.count = 0;
    existing.windowStart = now;
    existing.lockedUntil = 0;
  }

  return existing;
}

async function rejectAuth(message: string, status = 401) {
  await sleep(FAILURE_DELAY_MS);
  return NextResponse.json({ error: message }, { status });
}

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
    return rejectAuth("Invalid credentials");
  }

  const email = body?.email?.trim() || "";
  const password = body?.password || "";
  if (!email || !password) {
    return rejectAuth("Invalid credentials");
  }

  const now = Date.now();
  const key = getClientKey(request, email);
  const state = getAttemptState(key, now);

  if (state.lockedUntil > now) {
    return rejectAuth("Too many attempts. Try again later.", 429);
  }

  try {
    const backendRes = await fetch(`${API_ORIGIN}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Lang: request.cookies.get("locale")?.value || "en",
        "Accept-Language": request.cookies.get("locale")?.value || "en",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!backendRes.ok) {
      state.count += 1;
      if (state.count >= MAX_FAILED_ATTEMPTS) {
        state.lockedUntil = now + LOCK_MS;
      }
      return rejectAuth("Invalid credentials", backendRes.status === 429 ? 429 : 401);
    }

    const payload = (await backendRes.json().catch(() => null)) as LoginPayload | null;
    const token = payload?.token?.trim() || "";
    const isAdmin = Boolean(payload?.user?.is_admin);

    if (!token || !isAdmin) {
      state.count += 1;
      if (state.count >= MAX_FAILED_ATTEMPTS) {
        state.lockedUntil = now + LOCK_MS;
      }
      return rejectAuth("Invalid credentials");
    }

    attempts.delete(key);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: TOKEN_COOKIE_KEY,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    response.cookies.set({
      name: LEGACY_TOKEN_COOKIE_KEY,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    response.cookies.set({
      name: "logged_in",
      value: "1",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    return response;
  } catch {
    return rejectAuth("Invalid credentials");
  }
}
