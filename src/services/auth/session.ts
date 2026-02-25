"use client";

const ADMIN_HINT_STORAGE_KEY = "auth:is_admin";

type LoginUser = {
  is_admin?: boolean;
};

type LoginResponse = {
  token?: string;
  user?: LoginUser;
};

export function setAuthSession(response: LoginResponse): void {
  if (typeof window !== "undefined") {
    const isAdmin = Boolean(response.user?.is_admin);
    sessionStorage.setItem(ADMIN_HINT_STORAGE_KEY, isAdmin ? "1" : "0");
  }
}

export function clearAuthSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_HINT_STORAGE_KEY);
  }
}

export function getAdminHint(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_HINT_STORAGE_KEY) === "1";
}

