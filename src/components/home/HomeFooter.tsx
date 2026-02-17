"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HomeFooter = () => {
  const t = useTranslations();

  return (
    <div className="w-full bg-gray-11 md:pb-12 md:px-10 md:pt-16 lg:px-20 lg:pt-25 relative">
      <div className="absolute md:hidden top-0 left-5 w-[335px] h-[335px] translate-y-[-14%] opacity-10">
        <Image
          src="/images/vector-1.png"
          alt=""
          fill
          sizes="(min-width: 768px) 335px, 200px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="hidden absolute md:block top-0 left-[15%] w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] md:translate-y-[-14%] opacity-10">
        <Image
          src="/images/vector-1.png"
          alt=""
          fill
          sizes="(min-width: 768px) 600px, 200px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center justify-center py-16 md:py-0 border-b border-b-gray-13 md:border-none">
        <h2 className="headline-01 text-gray-1 text-center">
          {t.rich('tagline', {
            br: () => <br />
          })}
        </h2>
      </div>
      <div className="z-20 block w-full md:pt-16 lg:pt-25">
        <div className="grid grid-cols-12 md:gap-x-6 lg:gap-x-8">
          <div className="col-span-12 md:col-span-3 flex items-end gap-3 order-3 md:order-none px-5 md:px-0 pb-6 md:pb-0 border-t border-t-gray-13 md:border-none pt-10 md:pt-0">
            <div className="relative w-8 h-16 md:w-10 md:h-20">
              <Image
                src="/images/Logo-2.svg"
                alt="Ahnoud"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <span className="body-3 text-gray-1">
              {t("footer_copyright")}
            </span>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col gap-2 order-1 md:order-none px-5 md:px-0 py-6 md:py-0 border-b border-b-gray-13 md:border-none">
            <span className="button-01 text-gray-1">
              {t("footer_email")}
            </span>
            <p className="body-03 text-gray-5">
              {t("footer_address_line1")}
              <br />
              {t("footer_address_line2")}
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:col-start-10 flex flex-col gap-4 md:gap-2 order-2 md:order-none border-e border-e-gray-13 md:border-none px-5 md:px-0 py-4 md:py-0">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(".snap-y")?.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="button-01 text-gray-1!"
            >
              {t("home_label")}
            </Link>
            <Link
              href="/about"
              className="button-01 text-gray-1!"
            >
              {t("about_us_label")}
            </Link>
            <Link
              href="/contact"
              className="button-01 text-gray-1!"
            >
              {t("contact_us_nav_label")}
            </Link>
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2 lg:col-start-12 flex flex-col gap-4 md:gap-2 order-2 md:order-none px-5 md:px-0 py-4 md:py-0">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-01 text-gray-1!"
            >
              {t("instagram_label")}
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-01 text-gray-1!"
            >
              {t("x_label")}
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-01 text-gray-1!"
            >
              {t("facebook_label")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;