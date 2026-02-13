"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HomeFooter = () => {
  const t = useTranslations();

  return (
    <div className="w-full bg-gray-12">
      {/* Tagline banner */}
      <div className="flex items-center justify-center py-20 md:py-32 px-5 md:px-10 lg:px-20">
        <h2 className="headline-01 text-gray-1 text-center">
          {t("tagline")}
        </h2>
      </div>

      {/* Divider */}
      <div className="mx-5 md:mx-10 lg:mx-20 h-[1px] bg-gray-10" />

      {/* Footer content */}
      <div className="px-5 md:px-10 lg:px-20 py-10 md:py-16">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          {/* Logo & copyright */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
            <div className="relative w-[56px] h-[56px]">
              <Image
                src="/images/Logo.svg"
                alt="Ahnoud"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <span className="caption-01 text-gray-6">
              {t("footer_copyright")}
            </span>
          </div>

          {/* Contact info */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <Link
              href="mailto:ahnoud@info.com"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("footer_email")}
            </Link>
            <p className="caption-01 text-gray-6">
              {t("footer_address_line1")}
            </p>
            <p className="caption-01 text-gray-6">
              {t("footer_address_line2")}
            </p>
          </div>

          {/* Navigation links */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
            <Link
              href="/"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("home_label")}
            </Link>
            <Link
              href="/about"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("about_us_label")}
            </Link>
            <Link
              href="/contact"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("contact_us_nav_label")}
            </Link>
          </div>

          {/* Social links */}
          <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("instagram_label")}
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
            >
              {t("x_label")}
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="body-03 text-gray-1 hover:text-primary-7 transition-colors"
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
