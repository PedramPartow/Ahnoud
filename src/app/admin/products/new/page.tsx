"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminProductsApi, ApiError } from "@/services/api";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "Pistachios",
    price: "",
    stock: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminProductsApi.create({
        title: form.title,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        status: form.status,
      });
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <Link href="/admin/products" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-6 inline-block">
        &larr; Back to Products
      </Link>
      <h1 className="headline-04 text-gray-1 mb-10 md:mb-16">New Product</h1>
      {error && <p className="body-03 text-red-400 mb-6">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[600px]">
        <div className="flex flex-col gap-2">
          <label className="caption-01 text-gray-7">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-gray-10 pb-3 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="caption-01 text-gray-7">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 pb-3 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors"
            >
              <option value="Pistachios" className="bg-gray-12">Pistachios</option>
              <option value="Saffron" className="bg-gray-12">Saffron</option>
              <option value="Dates" className="bg-gray-12">Dates</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="caption-01 text-gray-7">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 pb-3 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors"
            >
              <option value="draft" className="bg-gray-12">Draft</option>
              <option value="active" className="bg-gray-12">Active</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="caption-01 text-gray-7">Price ($)</label>
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-10 pb-3 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="caption-01 text-gray-7">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-10 pb-3 body-03 text-gray-1 outline-none focus:border-gray-5 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 py-4 bg-gray-1 text-gray-13 button-01 text-center cursor-pointer hover:bg-gray-3 transition-colors w-full md:w-auto md:px-12"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
