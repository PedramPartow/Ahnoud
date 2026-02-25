"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { adminOrdersApi, ApiError } from "@/services/api";

type AdminOrder = {
  id?: number | string;
  status?: string;
  total?: number;
  total_price?: number;
  user?: { name?: string; full_name?: string; email?: string };
  customer_name?: string;
  customer_email?: string;
  created_at?: string;
};

function toList(payload: unknown): AdminOrder[] {
  if (Array.isArray(payload)) return payload as AdminOrder[];
  if (payload && typeof payload === "object") {
    const record = payload as { data?: unknown; items?: unknown; orders?: unknown };
    if (Array.isArray(record.data)) return record.data as AdminOrder[];
    if (Array.isArray(record.items)) return record.items as AdminOrder[];
    if (Array.isArray(record.orders)) return record.orders as AdminOrder[];
  }
  return [];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const payload = await adminOrdersApi.list();
        if (!isMounted) return;
        setOrders(toList(payload));
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof ApiError ? err.message : "Failed to load orders");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((order) => String(order.status || "").toLowerCase() === "pending").length;
    const completed = orders.filter((order) => String(order.status || "").toLowerCase() === "completed").length;
    return { total, pending, completed };
  }, [orders]);

  const updateStatus = async (id: number | string, status: string) => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;
    try {
      await adminOrdersApi.updateStatus(numericId, { status });
      setOrders((prev) =>
        prev.map((order) => (String(order.id) === String(id) ? { ...order, status } : order))
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-2">
            &larr; Admin
          </Link>
          <h1 className="headline-04 text-gray-1">Orders</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Total Orders</span>
          <span className="subtitle-03 text-gray-1">{stats.total}</span>
        </div>
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Pending</span>
          <span className="subtitle-03 text-gray-5">{stats.pending}</span>
        </div>
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Completed</span>
          <span className="subtitle-03 text-primary-7">{stats.completed}</span>
        </div>
      </div>

      {loading && <p className="body-03 text-gray-7 py-4">Loading orders...</p>}
      {error && <p className="body-03 text-red-400 py-4">{error}</p>}

      {!loading && orders.length === 0 ? (
        <p className="body-03 text-gray-7 py-8">No orders found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-10 mb-2">
            <span className="col-span-2 caption-01 text-gray-7">Order #</span>
            <span className="col-span-3 caption-01 text-gray-7">Customer</span>
            <span className="col-span-2 caption-01 text-gray-7">Total</span>
            <span className="col-span-2 caption-01 text-gray-7">Status</span>
            <span className="col-span-3 caption-01 text-gray-7 text-end">Actions</span>
          </div>
          {orders.map((order) => {
            const customer = String(
              order.user?.full_name || order.user?.name || order.customer_name || order.user?.email || order.customer_email || "-"
            );
            const status = String(order.status || "pending");
            return (
              <div key={String(order.id)} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-10">
                <span className="col-span-6 md:col-span-2 subtitle-04 text-gray-1">#{String(order.id || "-")}</span>
                <span className="col-span-6 md:col-span-3 body-03 text-gray-5">{customer}</span>
                <span className="col-span-6 md:col-span-2 body-03 text-gray-1">${Number(order.total ?? order.total_price ?? 0)}</span>
                <span className="col-span-6 md:col-span-2 caption-01 text-gray-7">{status}</span>
                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end gap-3">
                  <button
                    onClick={() => updateStatus(String(order.id), "pending")}
                    className="caption-01 text-gray-5 hover:text-gray-1 transition-colors cursor-pointer"
                  >
                    Mark Pending
                  </button>
                  <button
                    onClick={() => updateStatus(String(order.id), "completed")}
                    className="caption-01 text-primary-7 hover:text-primary-6 transition-colors cursor-pointer"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
