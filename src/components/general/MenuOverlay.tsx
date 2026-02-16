"use client";

import { CloseIcon } from "@/icons/CloseIcon";
import { MailIcon as EarthIcon } from "@/icons/EarthIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import Button from "./Button";

const products = [
  { image: "/images/Pistachios.png", title: "Pistachios" },
  { image: "/images/Saffron.png", title: "Saffron" },
  { image: "/images/Dates.png", title: "Dates" },
] as const;

const navLinks = [
  { href: "/", labelKey: "home_label", active: true },
  { href: "/about", labelKey: "about_us_label", active: false },
  { href: "/contact", labelKey: "contact_us_nav_label", active: false },
] as const;

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const t = useTranslations();
  const locale = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.lang || "en",
    () => "en"
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSwitchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* <div
        className={`md:hidden fixed inset-0 z-50 bg-gray-13 flex flex-col transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 pt-2">
          <Image
            src="/images/Logo.svg"
            alt="ahnoud logo"
            className="w-[33px] h-[40px]"
            width={40}
            height={48}
          />
          <div className="flex items-center gap-4">
            <Button className="primary sm-md" href="/auth" onClick={onClose}>
              {t("join_or_login_button")}
            </Button>
            <button type="button" onClick={onClose} className="text-gray-1 cursor-pointer">
              <CloseIcon size={24} />
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-6 px-5 mt-16 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href}
              onClick={onClose}
              className={`headline-03 transition-colors ${
                link.active ? "text-gray-1" : "text-gray-7"
              }`}
            >
              {link.active && (
                <Image
                  src="/images/Star.svg"
                  width={24}
                  height={24}
                  alt=""
                  className="inline-block align-middle me-2 w-5 h-5"
                />
              )}
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleSwitchLocale}
            className="flex items-center gap-2 text-gray-1 button-01 cursor-pointer w-fit border border-gray-7 rounded-full px-3 py-1.5"
          >
            <EarthIcon size={18} />
            <span>{locale === "ar" ? "English" : "العربي"}</span>
          </button>
          <div className="flex items-center gap-6">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("instagram_label")}
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("facebook_label")}
            </Link>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("x_label")}
            </Link>
          </div>
        </div>
      </div> */}
      <div
        className={` hidden md:flex fixed inset-0 z-50 bg-gray-13 flex-row transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
          <div className="z-20 flex items-center justify-between w-full fixed top-6 left-0 right-0 px-20">
            <Image
              src="/images/Logo.svg"
              alt="ahnoud logo"
              className="w-[40px] h-[48px]"
              width={40}
              height={48}
            />
            <div className="flex items-center gap-4 lg:gap-10">
              <Button className="primary sm-md" href="/auth" onClick={onClose}>
                {t("join_or_login_button")}
              </Button>
              <Button onClick={onClose} className="outline-gray sm-md">
                <CloseIcon size={24} />
              </Button>
            </div>
          </div>
        <div className="flex flex-col w-1/2 px-10 lg:px-20 pt-6 ">
          <nav className="flex flex-col gap-6 lg:gap-8 mt-16 lg:mt-24 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                href={link.href}
                onClick={onClose}
                className={`headline-03 transition-colors ${
                  link.active ? "text-gray-1" : "text-gray-7"
                }`}
              >
                {link.active && (
                  <Image
                    src="/images/Star.svg"
                    width={24}
                    height={24}
                    alt=""
                    className="inline-block align-middle me-2 w-5 h-5 lg:w-6 lg:h-6"
                  />
                )}
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="pb-10 flex flex-col gap-4">
            <button
              type="button"
              onClick={handleSwitchLocale}
              className="flex items-center gap-2 text-gray-1 button-01 cursor-pointer w-fit border border-gray-7 rounded-full px-3 py-1.5"
            >
              <EarthIcon size={18} />
            <span>{locale === "ar" ? "English" : "العربي"}</span>
          </button>
          <div className="flex items-center gap-6">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("instagram_label")}
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("facebook_label")}
            </Link>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="button-01 text-gray-1!">
              {t("x_label")}
            </Link>
          </div>
        </div>
      </div>
        <div className="w-1/2 grid grid-rows-3 h-full">
          {products.map((product) => (
            <div key={product.title} className="relative w-full h-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="50vw"
                className="object-cover brightness-50"
              />
              <span className="absolute flex items-center justify-start bottom-10 left-10 headline-03 text-gray-7 z-10">
                {product.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;