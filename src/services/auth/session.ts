"use client";

const TOKEN_COOKIE_KEY = "token";
const ADMIN_HINT_STORAGE_KEY = "auth:is_admin";
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

type LoginUser = {
  is_admin?: boolean;
};

type LoginResponse = {
  token?: string;
  user?: LoginUser;
};

function isHttps(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

export function setAuthSession(response: LoginResponse): void {
  const token = response.token?.trim();
  if (!token || typeof document === "undefined") return;

  const secureFlag = isHttps() ? "; Secure" : "";
  document.cookie = `${TOKEN_COOKIE_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${ONE_WEEK_IN_SECONDS}; SameSite=Lax${secureFlag}`;

  if (typeof window !== "undefined") {
    const isAdmin = Boolean(response.user?.is_admin);
    sessionStorage.setItem(ADMIN_HINT_STORAGE_KEY, isAdmin ? "1" : "0");
  }
}

export function clearAuthSession(): void {
  if (typeof document !== "undefined") {
    document.cookie = `${TOKEN_COOKIE_KEY}=; Path=/; Max-Age=0`;
  }

  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_HINT_STORAGE_KEY);
  }
}

export function getAdminHint(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_HINT_STORAGE_KEY) === "1";
}

