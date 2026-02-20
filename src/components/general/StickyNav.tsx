"use client";

import ArrowUpTailIcon from "@/icons/ArrowUpTailIcon";
import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import Button from "./Button";
import CartOverlay from "./CartOverlay";
import MenuOverlay from "./MenuOverlay";

function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
}

const emptySubscribe = () => () => {};

interface StickyNavProps {
    scrollContainerRef: RefObject<HTMLDivElement | null>;
    variant: "home" | "product";
}

const StickyNav = ({ scrollContainerRef, variant }: StickyNavProps) => {
    const t = useTranslations();
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartCount] = useState(9);

    const isLoggedIn = useSyncExternalStore(
        emptySubscribe,
        () => !!getAuthToken(),
        () => false
    );

    const handleLogout = () => {
        document.cookie = "token=;path=/;max-age=0";
        setMenuOpen(false);
        window.location.reload();
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setVisible(container.scrollTop > window.innerHeight * 0.5);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [scrollContainerRef]);

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <MenuOverlay
                isOpen={menuOpen}
                onLogout={handleLogout}
                cartCount={cartCount}
                onClose={() => setMenuOpen(false)}
            />
            <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            <div
                className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-10 lg:px-20 py-2 md:py-4 bg-gray-13/90 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex items-center justify-between">
                    <button onClick={scrollToTop} className="cursor-pointer">
                        <Image
                            src="/images/Logo.svg"
                            alt="ahnoud logo"
                            className="w-[33px] h-[40px] md:w-[40px] md:h-[48px]"
                            width={40}
                            height={48}
                        />
                    </button>
                    <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
                        <div className="hidden md:flex items-center gap-4 lg:gap-8">
                            {variant === "home" ? (
                                <Button className="dark sm-md" href="/product">
                                    {t("products_label")}
                                </Button>
                            ) : (
                                <Button className="dark sm-md" href="/">
                                    {t("home_label")}
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            {isLoggedIn ? (
                                <Button className="outline-gray sm-md" onClick={() => setCartOpen(true)}>
                                    <ShoppingBagIcon />
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        href="/auth"
                                        className="hidden! md:inline-flex! primary sm-md"
                                    >
                                        {t("join_or_login_button")}
                                    </Button>
                                    <Button className="md:hidden! primary sm-md">
                                        <UserCircleIcon size={24} />
                                    </Button>
                                </>
                            )}
                            <Button
                                className="outline-gray sm-md"
                                onClick={() => setMenuOpen(true)}
                            >
                                <MenuIcon />
                            </Button>
                            <Button
                                className="outline-gray sm-md"
                                onClick={scrollToTop}
                            >
                                <ArrowUpTailIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StickyNav;