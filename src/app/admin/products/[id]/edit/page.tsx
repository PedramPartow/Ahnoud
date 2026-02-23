"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const STATIC_PRODUCTS: Record<string, { title: string; category: string; price: number; stock: number; status: string }> = {
  "1": { title: "Imperial Reserve Pistachios", category: "Pistachios", price: 149, stock: 84, status: "active" },
  "2": { title: "Royal Saffron Threads", category: "Saffron", price: 259, stock: 32, status: "active" },
  "3": { title: "Premium Medjool Dates", category: "Dates", price: 89, stock: 120, status: "active" },
  "4": { title: "Golden Saffron Gift Box", category: "Saffron", price: 399, stock: 15, status: "draft" },
  "5": { title: "Pistachio Luxury Collection", category: "Pistachios", price: 199, stock: 56, status: "active" },
  "6": { title: "Heritage Date Selection", category: "Dates", price: 129, stock: 0, status: "draft" },
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = STATIC_PRODUCTS[id];

  const [form, setForm] = useState(
    product ?? { title: "", category: "Pistachios", price: 0, stock: 0, status: "draft" }
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
        <Link href="/admin/products" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors">
          &larr; Back to Products
        </Link>
        <p className="body-03 text-gray-7 mt-10">Product not found.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with API call to /api/admin/products/[id] (PUT)
    alert(`Product updated (static):\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <Link href="/admin/products" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-6 inline-block">
        &larr; Back to Products
      </Link>
      <h1 className="headline-04 text-gray-1 mb-10 md:mb-16">Edit Product</h1>

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
          className="mt-6 py-4 bg-gray-1 text-gray-13 button-01 text-center cursor-pointer hover:bg-gray-3 transition-colors w-full md:w-auto md:px-12"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
