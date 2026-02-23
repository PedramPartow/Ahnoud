"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: "active" | "draft";
}

const STATIC_PRODUCTS: Product[] = [
  { id: 1, title: "Imperial Reserve Pistachios", category: "Pistachios", price: 149, stock: 84, image: "/images/Pistachios.png", status: "active" },
  { id: 2, title: "Royal Saffron Threads", category: "Saffron", price: 259, stock: 32, image: "/images/Saffron.png", status: "active" },
  { id: 3, title: "Premium Medjool Dates", category: "Dates", price: 89, stock: 120, image: "/images/Dates.png", status: "active" },
  { id: 4, title: "Golden Saffron Gift Box", category: "Saffron", price: 399, stock: 15, image: "/images/Saffron.png", status: "draft" },
  { id: 5, title: "Pistachio Luxury Collection", category: "Pistachios", price: 199, stock: 56, image: "/images/Pistachios.png", status: "active" },
  { id: 6, title: "Heritage Date Selection", category: "Dates", price: 129, stock: 0, image: "/images/Dates.png", status: "draft" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const totalProducts = products.length;
  const activeCount = products.filter((p) => p.status === "active").length;
  const draftCount = products.filter((p) => p.status === "draft").length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

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

        {filtered.length === 0 ? (
          <p className="body-03 text-gray-7 py-8">No products match your criteria.</p>
        ) : (
          <div className="flex flex-col">
            {filtered.map((p) => (
              <div key={p.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-10">
                {/* Product info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 overflow-hidden bg-gray-12">
                    <Image src={p.image} alt={p.title} fill sizes="56px" className="object-cover" />
                  </div>
                  <span className="subtitle-04 text-gray-1">{p.title}</span>
                </div>

                {/* Mobile meta row */}
                <div className="col-span-12 md:hidden flex items-center gap-4 ps-16">
                  <span className="caption-01 text-gray-5">{p.category}</span>
                  <span className="caption-01 text-gray-1">${p.price}</span>
                  <span className="caption-01 text-gray-7">{p.stock} in stock</span>
                  <span className={`caption-01 ${p.status === "active" ? "text-primary-7" : "text-gray-7"}`}>
                    {p.status}
                  </span>
                </div>

                {/* Desktop columns */}
                <span className="hidden md:block col-span-2 caption-01 text-gray-5">{p.category}</span>
                <span className="hidden md:block col-span-1 body-03 text-gray-1">${p.price}</span>
                <span className={`hidden md:block col-span-1 caption-01 ${p.stock === 0 ? "text-red-400" : "text-gray-5"}`}>
                  {p.stock}
                </span>
                <span className={`hidden md:block col-span-1 caption-01 ${p.status === "active" ? "text-primary-7" : "text-gray-7"}`}>
                  {p.status}
                </span>

                {/* Actions */}
                <div className="col-span-12 md:col-span-2 flex items-center gap-4 justify-start md:justify-end ps-16 md:ps-0">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="caption-01 text-gray-5 hover:text-gray-1 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
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
