import { NextResponse } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await adminFetch(`/admin/products/${params.id}`);
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const res = await adminFetch(`/admin/products/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const res = await adminFetch(`/admin/products/${params.id}`, {
    method: "DELETE",
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
