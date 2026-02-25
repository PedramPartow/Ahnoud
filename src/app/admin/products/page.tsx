"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { adminProductsApi, ApiError } from "@/services/api";

type Product = {
  id?: number | string;
  title?: string;
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  image?: string;
  image_url?: string;
  status?: string;
};

function toList(payload: unknown): Product[] {
  if (Array.isArray(payload)) return payload as Product[];
  if (payload && typeof payload === "object") {
    const record = payload as { data?: unknown; items?: unknown; products?: unknown };
    if (Array.isArray(record.data)) return record.data as Product[];
    if (Array.isArray(record.items)) return record.items as Product[];
    if (Array.isArray(record.products)) return record.products as Product[];
  }
  return [];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const payload = await adminProductsApi.list();
        if (!isMounted) return;
        setProducts(toList(payload));
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof ApiError ? err.message : "Failed to load products");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => products.filter((p) => {
    const normalizedStatus = String(p.status || "draft").toLowerCase();
    const normalizedTitle = String(p.title || p.name || "");
    const normalizedCategory = String(p.category || "");
    const matchesFilter = filter === "all" || normalizedStatus === filter;
    const matchesSearch =
      normalizedTitle.toLowerCase().includes(search.toLowerCase()) ||
      normalizedCategory.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [products, filter, search]);

  const handleDelete = async (id: number | string) => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;
    try {
      await adminProductsApi.delete(numericId);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete product");
    }
  };

  const totalProducts = products.length;
  const activeCount = products.filter((p) => String(p.status || "").toLowerCase() === "active").length;
  const draftCount = products.filter((p) => String(p.status || "").toLowerCase() !== "active").length;
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-2">
            &larr; Admin
          </Link>
          <h1 className="headline-04 text-gray-1">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="py-3 px-6 bg-gray-1 text-gray-13 button-01 hover:bg-gray-3 transition-colors"
        >
          + New
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Total</span>
          <span className="subtitle-03 text-gray-1">{totalProducts}</span>
        </div>
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Active</span>
          <span className="subtitle-03 text-primary-7">{activeCount}</span>
        </div>
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Draft</span>
          <span className="subtitle-03 text-gray-5">{draftCount}</span>
        </div>
        <div className="border border-gray-10 p-4 md:p-6 flex flex-col gap-1">
          <span className="caption-01 text-gray-7">Total Stock</span>
          <span className="subtitle-03 text-gray-1">{totalStock}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="flex gap-2">
          {(["all", "active", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 caption-01 capitalize cursor-pointer transition-colors border ${
                filter === f ? "border-gray-1 text-gray-1" : "border-gray-10 text-gray-7 hover:border-gray-7"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-b border-gray-10 pb-2 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors w-full md:w-[280px]"
        />
      </div>

      {loading && <p className="body-03 text-gray-7 py-4">Loading products...</p>}
      {error && <p className="body-03 text-red-400 py-4">{error}</p>}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        {/* Header - desktop */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-10 mb-2">
          <span className="col-span-5 caption-01 text-gray-7">Product</span>
          <span className="col-span-2 caption-01 text-gray-7">Category</span>
          <span className="col-span-1 caption-01 text-gray-7">Price</span>
          <span className="col-span-1 caption-01 text-gray-7">Stock</span>
          <span className="col-span-1 caption-01 text-gray-7">Status</span>
          <span className="col-span-2 caption-01 text-gray-7 text-end">Actions</span>
        </div>

        {!loading && filtered.length === 0 ? (
          <p className="body-03 text-gray-7 py-8">No products match your criteria.</p>
        ) : (
          <div className="flex flex-col">
            {filtered.map((p) => (
              <div key={String(p.id)} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-10">
                {/* Product info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 overflow-hidden bg-gray-12">
                    <Image
                      src={p.image || p.image_url || "/images/Pistachios.png"}
                      alt={String(p.title || p.name || "Product")}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <span className="subtitle-04 text-gray-1">{String(p.title || p.name || "Untitled product")}</span>
                </div>

                {/* Mobile meta row */}
                <div className="col-span-12 md:hidden flex items-center gap-4 ps-16">
                  <span className="caption-01 text-gray-5">{String(p.category || "-")}</span>
                  <span className="caption-01 text-gray-1">${Number(p.price || 0)}</span>
                  <span className="caption-01 text-gray-7">{Number(p.stock || 0)} in stock</span>
                  <span className={`caption-01 ${String(p.status || "").toLowerCase() === "active" ? "text-primary-7" : "text-gray-7"}`}>
                    {String(p.status || "draft")}
                  </span>
                </div>

                {/* Desktop columns */}
                <span className="hidden md:block col-span-2 caption-01 text-gray-5">{String(p.category || "-")}</span>
                <span className="hidden md:block col-span-1 body-03 text-gray-1">${Number(p.price || 0)}</span>
                <span className={`hidden md:block col-span-1 caption-01 ${Number(p.stock || 0) === 0 ? "text-red-400" : "text-gray-5"}`}>
                  {Number(p.stock || 0)}
                </span>
                <span className={`hidden md:block col-span-1 caption-01 ${String(p.status || "").toLowerCase() === "active" ? "text-primary-7" : "text-gray-7"}`}>
                  {String(p.status || "draft")}
                </span>

                {/* Actions */}
                <div className="col-span-12 md:col-span-2 flex items-center gap-4 justify-start md:justify-end ps-16 md:ps-0">
                  <Link
                    href={`/admin/products/${String(p.id)}/edit`}
                    className="caption-01 text-gray-5 hover:text-gray-1 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(String(p.id))}
                    className="caption-01 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
