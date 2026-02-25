import { type NextRequest } from "next/server";
import { config, middleware } from "../middleware";

export { config };

export async function proxy(request: NextRequest) {
  return middleware(request);
}
