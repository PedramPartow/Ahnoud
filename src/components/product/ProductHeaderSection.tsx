"use client";

import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import Button from "../general/Button";
import MenuOverlay from "../general/MenuOverlay";
import ProductCard, { type Product } from "./ProductCard";

function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
}

const emptySubscribe = () => () => {};

const products: Product[] = [
    { id: 1, name: "Imperial Reserve", category: "Royal", price: 149, image: "/images/Pistachios.png" },
    { id: 2, name: "Golden Heritage", category: "Premium", price: 129, image: "/images/product2.png" },
    { id: 3, name: "Imperial Reserve", category: "Royal", price: 149, image: "/images/product3.png" },
];

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
        <div className="w-full block px-5 md:px-10 lg:px-20">
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
            <div className="flex items-center justify-center mt-8 md:mt-4">
                <span className="headline-06 text-gray-1">{t('pistachios_label')}</span>
            </div>
            <div className="flex items-center justify-center mt-16 mb-30 md:mt-50 md:mb-50 text-center">
                <span className="headline-01 text-gray-1">
                    {t.rich('pistachios_description_label', {
                        br: () => <br />
                    })}
                </span>
            </div>
            <div className="flex flex-col gap-6 md:mb-20">
                <div className="flex justify-between items-center">
                    <span className="subtitle-04 text-gray-1">{t('packaging_label')}</span>
                    <span className="subtitle-04 text-gray-1">{t('choices_label')}</span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductHeaderSection;