import { cookies } from "next/headers";

export async function adminFetch(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const token =
    cookieStore.get("__Host-token")?.value ||
    cookieStore.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const meResponse = await fetch(`${process.env.BACKEND_URL}/api/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Lang: locale,
      "Accept-Language": locale,
    },
    cache: "no-store",
  }).catch(() => null);

  if (!meResponse || !meResponse.ok) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mePayload = (await meResponse.json().catch(() => null)) as
    | { is_admin?: boolean; user?: { is_admin?: boolean }; data?: { is_admin?: boolean; user?: { is_admin?: boolean } } }
    | null;
  const isAdmin = Boolean(
    mePayload?.is_admin ??
    mePayload?.user?.is_admin ??
    mePayload?.data?.is_admin ??
    mePayload?.data?.user?.is_admin
  );

  if (!isAdmin) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      Lang: locale,
      "Accept-Language": locale,
    },
    cache: "no-store",
  });
}
