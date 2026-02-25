"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import Button from "../general/Button";
import CartOverlay from "../general/CartOverlay";
import MenuOverlay from "../general/MenuOverlay";

function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    const sessionMatch = document.cookie.match(/(?:^|;\s*)logged_in=([^;]*)/);
    if (sessionMatch) return decodeURIComponent(sessionMatch[1]);
    const legacyMatch = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return legacyMatch ? decodeURIComponent(legacyMatch[1]) : undefined;
}

const emptySubscribe = () => () => {};

const CheckoutHeaderSection = () => {
    const t = useTranslations();
    const isLoggedIn = useSyncExternalStore(
        emptySubscribe,
        () => !!getAuthToken(),
        () => false
    ); 

    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartCount] = useState(9);

    return (
        <div className="w-full block px-5 md:px-10 lg:px-20">
            <MenuOverlay isOpen={menuOpen} cartCount={cartCount} onClose={() => setMenuOpen(false)} />
            <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />
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
                        <Button className="dark sm-md" href="/product">
                            {t("products_label")}
                            <ArrowDownIcon />
                        </Button>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        {isLoggedIn ? (
                            <Button className="outline-gray sm-md" onClick={() => setCartOpen(true)}>
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
        </div>
    );
};

export default CheckoutHeaderSection;