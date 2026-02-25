import { type NextRequest } from "next/server";
import { middleware } from "../middleware";

export const config = {
  matcher: ["/:path*"],
};

export async function proxy(request: NextRequest) {
  return middleware(request);
}
