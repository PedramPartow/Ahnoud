"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminContactFormsApi, ApiError } from "@/services/api";

type ContactForm = {
  id?: number | string;
  full_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  created_at?: string;
};

function toList(payload: unknown): ContactForm[] {
  if (Array.isArray(payload)) return payload as ContactForm[];
  if (payload && typeof payload === "object") {
    const record = payload as { data?: unknown; items?: unknown; contact_forms?: unknown };
    if (Array.isArray(record.data)) return record.data as ContactForm[];
    if (Array.isArray(record.items)) return record.items as ContactForm[];
    if (Array.isArray(record.contact_forms)) return record.contact_forms as ContactForm[];
  }
  return [];
}

export default function AdminContactFormsPage() {
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const payload = await adminContactFormsApi.list();
        if (!isMounted) return;
        setForms(toList(payload));
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof ApiError ? err.message : "Failed to load contact forms");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: number | string) => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;
    try {
      await adminContactFormsApi.delete(numericId);
      setForms((prev) => prev.filter((form) => String(form.id) !== String(id)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-13 px-5 md:px-10 lg:px-20 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="caption-01 text-gray-7 hover:text-gray-5 transition-colors mb-2">
            &larr; Admin
          </Link>
          <h1 className="headline-04 text-gray-1">Contact forms</h1>
        </div>
      </div>

      {loading && <p className="body-03 text-gray-7 py-4">Loading messages...</p>}
      {error && <p className="body-03 text-red-400 py-4">{error}</p>}

      {!loading && forms.length === 0 ? (
        <p className="body-03 text-gray-7 py-8">No contact forms found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {forms.map((form) => (
            <div key={String(form.id)} className="border border-gray-10 p-5 md:p-6 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex flex-col">
                  <span className="subtitle-04 text-gray-1">{String(form.full_name || form.name || "Unknown sender")}</span>
                  <span className="caption-01 text-gray-7">{String(form.email || "-")}</span>
                </div>
                <span className="caption-01 text-gray-7">
                  {form.created_at ? new Date(form.created_at).toLocaleString() : ""}
                </span>
              </div>
              {form.subject && <p className="body-03 text-gray-5">Subject: {form.subject}</p>}
              <p className="body-03 text-gray-1 whitespace-pre-wrap">{String(form.message || "-")}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(String(form.id))}
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
  );
}
