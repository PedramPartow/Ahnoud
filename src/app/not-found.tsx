"use client";

import Button from "@/components/general/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen min-h-dvh bg-gray-13 flex flex-col">
      <div className="px-5 md:px-10 lg:px-20 pt-4 md:pt-6">
        <Image
          src="/images/Logo.svg"
          alt="Ahnoud"
          width={40}
          height={48}
          className="w-[33px] h-[40px] md:w-[40px] md:h-[48px]"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-10 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] opacity-5 pointer-events-none">
          <Image
            src="/images/vector-1.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 450px, 280px"
            className="object-contain"
            aria-hidden="true"
          />
        </div>
        <span
          className="text-[100px] md:text-[160px] lg:text-[240px] font-semibold leading-none text-primary-7 opacity-15 select-none"
          aria-hidden="true"
        >
          404
        </span>
        <div className="relative z-10 flex flex-col items-center text-center -mt-3 md:-mt-6 lg:-mt-10">
          <h1 className="headline-03 text-gray-1">
            {t("not_found_title")}
          </h1>
          <p className="body-01 text-gray-5 mt-3 md:mt-5 lg:mt-6 max-w-[300px] md:max-w-md lg:max-w-lg">
            {t("not_found_subtitle")}
          </p>
          <div className="mt-6 md:mt-10 lg:mt-12">
            <Button className="primary sm-md" href="/">
              {t("not_found_button")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}