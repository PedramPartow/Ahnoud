"use client";

import React from "react";

interface TabItem {
  id: string;
  label: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange, className = "" }) => {
  return (
    <div
      className={`inline-flex w-full border-4 border-gray-1-alpha-10 bg-gray-13 overflow-hidden ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "flex-1 py-[14px] button-01 transition-colors",
              isActive
                ? "bg-gray-13 text-gray-1"
                : "bg-gray-1-alpha-10 text-gray-5 hover:text-gray-1",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;