import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function adminFetch(path: string, init?: RequestInit) {
  const session = await getServerSession(authOptions);

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
    },
    cache: "no-store",
  });
}
