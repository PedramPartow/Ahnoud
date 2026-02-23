"use client";

import CloseIcon from "@/icons/CloseIcon";
import EarthIcon from "@/icons/EarthIcon";
import LogoutIcon from "@/icons/LogoutIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Button from "./Button";

function getAuthToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

const emptySubscribe = () => () => {};

const navLinks = [
  { href: "/", labelKey: "home_label" },
  { href: "/about-us", labelKey: "about_us_label" },
  { href: "/contact-us", labelKey: "contact_us_nav_label" },
] as const;

const products = [
  { image: "/images/Pistachios.png", title: "pistachios_label" },
  { image: "/images/Saffron.png", title: "saffron_label" },
  { image: "/images/Dates.png", title: "dates_label" },
] as const;

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  cartCount?: number;
}

const MenuOverlay = ({ isOpen, onClose, onLogout, cartCount = 0 }: MenuOverlayProps) => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useSyncExternalStore(
    emptySubscribe,
    () => document.documentElement.lang || "en",
    () => "en"
  );
  const isLoggedIn = useSyncExternalStore(
    emptySubscribe,
    () => !!getAuthToken(),
    () => false
  );

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  useEffect(() => {
    if (!isOpen) return;
    const mobile = mobileRef.current;
    const desktop = desktopRef.current;
    const isRtl = document.documentElement.dir === "rtl";

    if (mobile) {
      mobile.style.transform = isRtl ? "translateX(100%)" : "translateX(-100%)";
      mobile.style.display = "";
      mobile.getBoundingClientRect();
      mobile.style.transform = "";
    }
    if (desktop) {
      desktop.style.transform = "translateY(-100%)";
      desktop.style.display = "";
      desktop.getBoundingClientRect();
      desktop.style.transform = "";
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      if (mobileRef.current) mobileRef.current.style.display = "none";
      if (desktopRef.current) desktopRef.current.style.display = "none";
    }
  };

  const handleSwitchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-100 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-label={t("close_menu_label")}
      />
      <div
        ref={mobileRef}
        role="dialog"
        aria-modal="true"
        style={{ display: "none" }}
        onTransitionEnd={handleTransitionEnd}
        className={`overflow-y-auto md:hidden fixed inset-0 z-100 bg-gray-13 flex flex-col transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 px-5 pt-2">
          <div className="flex items-center justify-between">
            <Image
              src="/images/Logo.svg"
              alt="ahnoud logo"
              className="w-[33px] h-[40px]"
              width={33}
              height={40}
            />
            <div className="flex items-center gap-4">
              {isLoggedIn && cartCount > 0 && (
                <Button className="primary sm-md" href="/product" onClick={onClose}>
                  <ShoppingBagIcon size={20} />
                  <span className="button-01">{cartCount}</span>
                </Button>
              )}
              <Button onClick={onClose} className="outline-gray sm-md">
                <CloseIcon />
              </Button>
            </div>
          </div>
          {!isLoggedIn && (
            <Button className="primary sm-md w-full justify-center" href="/auth" onClick={onClose}>
              <UserCircleIcon size={20} />
              <span className="button-01">{t("join_or_login_button")}</span>
            </Button>
          )}
        </div>

        <nav className="flex flex-col gap-6 px-5 my-20 flex-1">
          {navLinks.slice(0, 1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.labelKey}
                href={link.href}
                onClick={onClose}
                className="transition-colors flex items-center"
              >
                {isActive && (
                  <Image
                    src="/images/Star.svg"
                    width={20}
                    height={20}
                    alt=""
                    className="inline-block align-middle me-2 w-5 h-5"
                  />
                )}
                <span className={`headline-06 ${isActive ? "text-gray-1" : "text-gray-7"}`}>{t(link.labelKey)}</span>
              </Link>
            );
          })}
          {products.map((product) => (
            <Link
              key={product.title}
              href="/product"
              onClick={onClose}
              className="transition-colors flex items-center"
            >
              <span className="headline-06 text-gray-7">{t(product.title)}</span>
            </Link>
          ))}
          {navLinks.slice(1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.labelKey}
                href={link.href}
                onClick={onClose}
                className="transition-colors flex items-center"
              >
                {isActive && (
                  <Image
                    src="/images/Star.svg"
                    width={20}
                    height={20}
                    alt=""
                    className="inline-block align-middle me-2 w-5 h-5"
                  />
                )}
                <span className={`headline-06 ${isActive ? "text-gray-1" : "text-gray-7"}`}>{t(link.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <Button
                type="button"
                onClick={onLogout}
                className="outline-gray sm-md w-fit"
              >
                <LogoutIcon />
                <span>{t("Logout_label")}</span>
              </Button>
            )}
            <Button
              type="button"
              onClick={handleSwitchLocale}
              className="outline-gray sm-md w-fit"
            >
              <EarthIcon size={18} />
              <span>{locale === "ar" ? "English" : "العربي"}</span>
            </Button>
          </div>
          <div className="flex items-center gap-10">
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
      <div
        ref={desktopRef}
        role="dialog"
        aria-modal="true"
        style={{ display: "none" }}
        onTransitionEnd={handleTransitionEnd}
        className={`hidden md:flex overflow-y-auto fixed inset-0 z-100 bg-gray-13 flex-row transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="z-20 flex items-center justify-between w-full absolute top-6 left-0 right-0 px-10 xl:px-20">
          <Image
            src="/images/Logo.svg"
            alt="ahnoud logo"
            className="w-[40px] h-[48px]"
            width={40}
            height={48}
          />
          <div className="flex items-center gap-4 lg:gap-10">
            {isLoggedIn ? (
              <>
                {cartCount > 0 && (
                  <Button className="primary sm-md" href="/product" onClick={onClose}>
                    <ShoppingBagIcon size={24} />
                    <span className="button-01 text-gray-13">{cartCount}</span>
                  </Button>
                )}
              </>
            ) : (
              <Button className="primary sm-md" href="/auth" onClick={onClose}>
                {t("join_or_login_button")}
              </Button>
            )}
            <Button onClick={onClose} className="outline-gray sm-md">
              <CloseIcon size={24} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-1/2 px-10 xl:px-20 pt-6">
          <nav className="flex flex-col pt-12 gap-8 lg:gap-12 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center transition-colors"
                >
                  {isActive && (
                    <Image
                      src="/images/Star.svg"
                      width={45}
                      height={45}
                      alt=""
                      className="inline-block align-middle me-2 w-[45px] h-[45px]"
                    />
                  )}
                  <span className={`headline-03 ${isActive ? "text-gray-1" : "text-gray-7"}`}>{t(link.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pb-10 flex flex-col gap-10">
            <div className="flex items-center gap-4">
              {isLoggedIn && (
                <Button
                  type="button"
                  onClick={onLogout}
                  className="outline-gray sm-md"
                >
                  <LogoutIcon />
                  <span>{t("Logout_label")}</span>
                </Button>
              )}
              <Button
                type="button"
                onClick={handleSwitchLocale}
                className="outline-gray sm-md"
              >
                <EarthIcon />
                <span>{locale === "ar" ? "English" : "العربي"}</span>
              </Button>
            </div>
            <div className="flex items-center gap-10">
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
                alt={t(product.title)}
                fill
                sizes="50vw"
                className="object-cover brightness-50"
              />
              <span className="absolute flex items-center justify-start bottom-10 start-10 headline-03 text-gray-7 z-10">
                {t(product.title)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;