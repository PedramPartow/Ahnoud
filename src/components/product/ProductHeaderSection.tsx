"use client";

import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import Button from "../general/Button";
import MenuOverlay from "../general/MenuOverlay";

function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
}

const emptySubscribe = () => () => {};

const ProductHeaderSection = () => {
    const t = useTranslations();
    const isLoggedIn = useSyncExternalStore(
        emptySubscribe,
        () => !!getAuthToken(),
        () => false
    );

    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(9);

    const handleLogout = () => {
        document.cookie = "token=;path=/;max-age=0";
        setMenuOpen(false);
        window.location.reload();
    };

    return (
        <>
            <MenuOverlay isOpen={menuOpen} onLogout={handleLogout} cartCount={cartCount} onClose={() => setMenuOpen(false)} />
            <div className="flex items-center justify-between">
                <Image
                    src="/images/Logo.svg"
                    alt="ahnoud logo"
                    className="w-[33px] h-[40px] md:w-[40px] md:h-[48px]"
                    width={40}
                    height={48}
                />
                <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        <Button className="dark sm-md" href="/">
                            {t("home_label")}
                        </Button>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        {isLoggedIn ? (
                            <Button className="outline-gray sm-md">
                                <ShoppingBagIcon />
                            </Button>
                        ) : (
                            <>
                                <Button href="/auth" className="hidden! md:inline-flex! primary sm-md">{t('join_or_login_button')}</Button>
                                <Button className="md:hidden! primary sm-md"><UserCircleIcon size={24} /></Button>
                            </>
                        )}
                        <Button className="outline-gray sm-md" onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductHeaderSection;