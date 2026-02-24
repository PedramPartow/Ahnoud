import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { cookies } from "next/headers";

export async function adminFetch(path: string, init?: RequestInit) {
  const session = await getServerSession(authOptions);
  const locale = (await cookies()).get("locale")?.value || process.env.LANG || "en";

  if (!session || (session as any).role !== "admin") {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const accessToken = (session as any).accessToken;

  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      Lang: locale,
      "Accept-Language": locale,
    },
    cache: "no-store",
  });
}
