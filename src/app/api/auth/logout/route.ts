import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("__Host-token");
  response.cookies.delete("token");
  response.cookies.delete("logged_in");
  return response;
}
