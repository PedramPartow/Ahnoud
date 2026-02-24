"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-gray-12)",
          color: "var(--color-gray-2)",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
          border: "1px solid var(--color-gray-10)",
          fontFamily: "inherit",
        },
      }}
    />
  );
}

