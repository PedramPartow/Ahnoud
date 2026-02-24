"use client";

import type { CSSProperties } from "react";
import toast from "react-hot-toast";

type ToastType = "success" | "error" | "info";

const getDirectionStyles = (): CSSProperties => {
  const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";

  return {
    direction: isRtl ? "rtl" : "ltr",
    textAlign: isRtl ? "right" : "left",
  };
};

const getToastStyle = (type: ToastType): CSSProperties => {
  const baseStyle: CSSProperties = {
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
    border: "1px solid var(--color-gray-10)",
    fontFamily: "inherit",
    ...getDirectionStyles(),
  };

  const typeStyles: Record<ToastType, CSSProperties> = {
    success: {
      background: "var(--color-secondary-13)",
      color: "var(--color-secondary-4)",
      border: "1px solid var(--color-secondary-10)",
    },
    error: {
      background: "#EF4444",
      color: "#FFFFFF",
      border: "1px solid #EF4444",
    },
    info: {
      background: "var(--color-gray-12)",
      color: "var(--color-gray-2)",
      border: "1px solid var(--color-gray-10)",
    },
  };

  return { ...baseStyle, ...typeStyles[type] };
};

export const toastUtils = {
  success: (message: string) =>
    toast.success(message, {
      style: getToastStyle("success"),
      duration: 4000,
    }),

  error: (message: string) =>
    toast.error(message, {
      style: getToastStyle("error"),
      duration: 5000,
    }),

  info: (message: string) =>
    toast(message, {
      style: getToastStyle("info"),
      duration: 4000,
    }),
};

