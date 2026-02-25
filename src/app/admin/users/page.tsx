"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { adminUsersApi, ApiError } from "@/services/api";

type AdminUser = {
  id?: number | string;
  name?: string;
  full_name?: string;
  email?: string;
  provider?: string;
  email_verified?: boolean;
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
};

function toList(payload: unknown): AdminUser[] {
  if (Array.isArray(payload)) return payload as AdminUser[];
  if (payload && typeof payload === "object") {
    const record = payload as { data?: unknown; items?: unknown; users?: unknown };
    if (Array.isArray(record.data)) return record.data as AdminUser[];
    if (Array.isArray(record.items)) return record.items as AdminUser[];
    if (Array.isArray(record.users)) return record.users as AdminUser[];
  }
  return [];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const parseUsersPayload = (
    payload: unknown,
    fallbackPage: number,
    fallbackPerPage: number
  ): { items: AdminUser[]; page: number; perPage: number; total: number; totalPages: number } => {
    if (Array.isArray(payload)) {
      const items = payload as AdminUser[];
      const safeTotal = items.length;
      return {
        items,
        page: fallbackPage,
        perPage: fallbackPerPage,
        total: safeTotal,
        totalPages: Math.max(1, Math.ceil(safeTotal / fallbackPerPage)),
      };
    }

    const record =
      payload && typeof payload === "object"
        ? (payload as {
            data?: unknown;
            items?: unknown;
            users?: unknown;
            meta?: {
              page?: number;
              current_page?: number;
              per_page?: number;
              total?: number;
              total_pages?: number;
              last_page?: number;
            };
            pagination?: {
              page?: number;
              current_page?: number;
              per_page?: number;
              total?: number;
              total_pages?: number;
              last_page?: number;
            };
          })
        : {};

    const items = toList(record);
    const meta = record.meta || record.pagination || {};
    const currentPage = Number(meta.page ?? meta.current_page ?? fallbackPage);
    const currentPerPage = Number(meta.per_page ?? fallbackPerPage);
    const currentTotal = Number(meta.total ?? items.length);
    const computedTotalPages = Number(
      meta.total_pages ?? meta.last_page ?? Math.max(1, Math.ceil(currentTotal / currentPerPage))
    );

    return {
      items,
      page: Number.isFinite(currentPage) && currentPage > 0 ? currentPage : fallbackPage,
      perPage: Number.isFinite(currentPerPage) && currentPerPage > 0 ? currentPerPage : fallbackPerPage,
      total: Number.isFinite(currentTotal) && currentTotal >= 0 ? currentTotal : items.length,
      totalPages:
        Number.isFinite(computedTotalPages) && computedTotalPages > 0
          ? computedTotalPages
          : Math.max(1, Math.ceil(items.length / fallbackPerPage)),
    };
  };

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const payload = await adminUsersApi.list(undefined, { page, per_page: perPage });
        if (!isMounted) return;
        const parsed = parseUsersPayload(payload, page, perPage);
        setUsers(parsed.items);
        setTotal(parsed.total);
        setTotalPages(parsed.totalPages);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof ApiError ? err.message : "Failed to load users");
        setUsers([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [page, perPage]);

  const filtered = useMemo(() => users.filter((user) => {
    const name = String(user.full_name || user.name || "");
    const email = String(user.email || "");
    const provider = String(user.provider || "");
    const id = String(user.id || "");
    const query = search.toLowerCase();
    return (
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      provider.toLowerCase().includes(query) ||
      id.toLowerCase().includes(query)
    );
  }), [users, search]);

  const formatDateTime = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = total === 0 ? 0 : from + users.length - 1;
  const skeletonRows = Math.min(perPage, 8);

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-2">
            &larr; Admin
          </Link>
          <h1 className="headline-04 text-gray-1">Users</h1>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
          <input
            type="text"
            placeholder="Search by id, name, email, provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-b border-gray-10 pb-2 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors w-full md:w-[320px]"
          />
          <div className="flex items-center gap-3">
            <label htmlFor="users-per-page" className="caption-01 text-gray-7">
              Per page
            </label>
            <select
              id="users-per-page"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-transparent border border-gray-10 px-3 py-2 caption-01 text-gray-1 outline-none"
            >
              <option value={10} className="bg-gray-12">10</option>
              <option value={25} className="bg-gray-12">25</option>
              <option value={50} className="bg-gray-12">50</option>
              <option value={100} className="bg-gray-12">100</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="body-03 text-red-400 py-4">{error}</p>}

      {loading ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-gray-10">
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">ID</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Full name</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Email</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Provider</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Email verified</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Role</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Created at</th>
                <th className="py-3 text-start caption-01 text-gray-7 font-normal">Updated at</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: skeletonRows }).map((_, index) => (
                <tr key={index} className="border-b border-gray-10 animate-pulse">
                  <td className="py-4 pe-4"><div className="h-4 w-10 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-28 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-40 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-16 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-10 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-14 bg-gray-11 rounded" /></td>
                  <td className="py-4 pe-4"><div className="h-4 w-28 bg-gray-11 rounded" /></td>
                  <td className="py-4"><div className="h-4 w-28 bg-gray-11 rounded" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filtered.length === 0 ? (
        <p className="body-03 text-gray-7 py-8">No users found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-gray-10">
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">ID</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Full name</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Email</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Provider</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Email verified</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Role</th>
                <th className="py-3 pe-4 text-start caption-01 text-gray-7 font-normal">Created at</th>
                <th className="py-3 text-start caption-01 text-gray-7 font-normal">Updated at</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={String(user.id || user.email)} className="border-b border-gray-10">
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{String(user.id || "-")}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{String(user.full_name || user.name || "-")}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{String(user.email || "-")}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{String(user.provider || "-")}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{user.email_verified ? "Yes" : "No"}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{user.is_admin ? "Admin" : "User"}</td>
                  <td className="py-4 pe-4 subtitle-04 text-gray-1">{formatDateTime(user.created_at)}</td>
                  <td className="py-4 subtitle-04 text-gray-1">{formatDateTime(user.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="caption-01 text-gray-7">
          Showing {from}-{to} of {total}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1 || loading}
            className="px-4 py-2 border border-gray-10 caption-01 text-gray-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="caption-01 text-gray-7">
            Page {page} / {Math.max(1, totalPages)}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(Math.max(1, totalPages), prev + 1))}
            disabled={page >= totalPages || loading}
            className="px-4 py-2 border border-gray-10 caption-01 text-gray-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
