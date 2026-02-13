"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const faqKeys = [
  { q: "faq_q1", a: "faq_a1" },
  { q: "faq_q2", a: "faq_a2" },
  { q: "faq_q3", a: "faq_a3" },
  { q: "faq_q4", a: "faq_a4" },
  { q: "faq_q5", a: "faq_a5" },
] as const;

const HomeFaqSection = () => {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full grid grid-cols-12 gap-y-10 md:gap-y-0">
      <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row items-start gap-6">
        <span className="subtitle-04 text-gray-1 shrink-0">
          {t("faqs_label")}
        </span>
        <h2 className="headline-04 text-gray-1">
          {t("faqs_heading")}
        </h2>
      </div>

      <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col">
        {faqKeys.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border-t border-t-tertiary-13 last:border-b last:border-b-tertiary-13"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 py-5 md:py-6 cursor-pointer"
              >
                <span
                  className={`subtitle-03 text-start transition-colors duration-300 ${
                    isOpen ? "text-gray-1" : "text-gray-7"
                  }`}
                >
                  {t(faq.q)}
                </span>
                <span className="text-gray-5 text-2xl shrink-0 w-6 h-6 flex items-center justify-center">
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="body-01 text-gray-1 pb-5 md:pb-6">
                    {t(faq.a)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFaqSection;