"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminProductsApi, ApiError } from "@/services/api";

type ProductForm = {
  title: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ProductForm>({
    title: "",
    category: "Pistachios",
    price: 0,
    stock: 0,
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const productId = Number(id);
    if (!Number.isFinite(productId)) {
      setError("Invalid product id");
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const product = await adminProductsApi.getById(productId);
        if (!isMounted) return;
        setForm({
          title: String(product?.title || product?.name || ""),
          category: String(product?.category || "Pistachios"),
          price: Number(product?.price || 0),
          stock: Number(product?.stock || 0),
          status: String(product?.status || "draft"),
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof ApiError ? err.message : "Failed to load product");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    run();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productId = Number(id);
    if (!Number.isFinite(productId)) return;
    setSaving(true);
    setError("");
    try {
      await adminProductsApi.update(productId, form);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <Link href="/admin/products" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-6 inline-block">
        &larr; Back to Products
      </Link>
      <h1 className="headline-04 text-gray-1 mb-10 md:mb-16">Edit Product</h1>
      {error && <p className="body-03 text-red-400 mb-6">{error}</p>}
      {loading ? (
        <p className="body-03 text-gray-7">Loading product...</p>
      ) : (

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
          disabled={saving}
          className="mt-6 py-4 bg-gray-1 text-gray-13 button-01 text-center cursor-pointer hover:bg-gray-3 transition-colors w-full md:w-auto md:px-12"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      )}
    </div>
  );
}
