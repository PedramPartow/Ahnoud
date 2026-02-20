"use client";

import AddIcon from "@/icons/AddIcon";
import ArrowRightTailIcon from "@/icons/ArrowRightTailIcon";
import CloseIcon from "@/icons/CloseIcon";
import RemoveIcon from "@/icons/RemoveIcon";
import TrashIcon from "@/icons/TrashIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from '../general/Button';

export type CartItem = {
    id: number;
    name: string;
    category: string;
    weight: string;
    dimensions: string;
    price: number;
    quantity: number;
    image: string;
};

const mockCartItems: CartItem[] = [
    {
        id: 1,
        name: "Imperial Reserve",
        category: "Royal",
        weight: "1kg",
        dimensions: "20 x 15 x 10 cm",
        price: 149,
        quantity: 3,
        image: "/images/Pistachios.png",
    },
    {
        id: 2,
        name: "Majestic Delight",
        category: "Royal",
        weight: "500 g",
        dimensions: "30 x 20 x 15 cm",
        price: 99,
        quantity: 2,
        image: "/images/Saffron.png",
    },
    {
        id: 3,
        name: "Imperial Threads",
        category: "Royal",
        weight: "10 g",
        dimensions: "10 x 7 x 5 cm",
        price: 259,
        quantity: 1,
        image: "/images/Dates.png",
    },
    {
        id: 4,
        name: "Emerald Delight",
        category: "Luxurious",
        weight: "250g",
        dimensions: "12 x 10 x 6 cm",
        price: 59,
        quantity: 7,
        image: "/images/pistachio.png",
    },
];

const productSuggestions = [
    { label: "pistachios_label", href: "/product" },
    { label: "saffron_label", href: "/product" },
    { label: "dates_label", href: "/product" },
] as const;

interface CartOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
    const t = useTranslations();
    const panelRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<CartItem[]>(mockCartItems);

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
        const panel = panelRef.current;
        if (panel) {
            const isRtl = document.documentElement.dir === "rtl";
            panel.style.transform = isRtl ? "translateX(-100%)" : "translateX(100%)";
            panel.style.display = "";
            panel.getBoundingClientRect();
            panel.style.transform = "";
        }
    }, [isOpen]);

    const handleTransitionEnd = () => {
        if (!isOpen && panelRef.current) {
            panelRef.current.style.display = "none";
        }
    };

    const updateQuantity = (id: number, delta: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const isEmpty = items.length === 0;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-100 transition-all duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
                role="button"
                tabIndex={-1}
                aria-label="Close cart"
            />

            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                style={{ display: "none" }}
                onTransitionEnd={handleTransitionEnd}
                className={`fixed top-0 end-0 bottom-0 z-100 w-full md:w-[420px] lg:w-[650px] bg-gray-13 flex flex-col transition-transform duration-500 ease-in-out
                    ${isOpen ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 md:px-10 lg:px-20 py-2 md:py-6 border-b border-gray-10">
                    <span className="subtitle-03 text-gray-1">{t("cart_label")}</span>
                    <Button onClick={onClose} className="outline-gray sm-md">
                        <CloseIcon />
                    </Button>
                </div>

                {isEmpty ? (
                    <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-10 lg:px-20">
                        <Image
                            src="/images/emptyCart.svg"
                            alt="Empty cart"
                            width={180}
                            height={180}
                            className="mb-6 opacity-70"
                        />
                        <span className="subtitle-03 text-gray-1 mb-2">
                            {t("empty_cart_title")}
                        </span>
                        <span className="body-01 text-gray-7 text-center">
                            {t("empty_cart_subtitle")}
                        </span>

                        <div className="w-full flex flex-col gap-2 mt-12 md:mt-20">
                            {productSuggestions.map((product) => (
                                <Button key={product.label} onClick={onClose} className="outline-gray sm-md flex! justify-between!">
                                    <span>{t(product.label)}</span>
                                    <ArrowRightTailIcon />
                                </Button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Items list */}
                        <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-5 md:px-10 lg:px-20">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-6 py-6 not-last:border-b border-gray-10 w-full"
                                >
                                    <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="80px"
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col items-start justify-between gap-2 md:gap-3 w-full">
                                        <div className="flex flex-col items-start justify-between gap-1 w-full">
                                            <div className="flex w-full justify-between items-center gap-1">
                                                <span className="subtitle-04 text-gray-1">
                                                    {item.name}
                                                </span>
                                                <Button
                                                    onClick={() => removeItem(item.id)}
                                                    className="dark sm"
                                                >
                                                    <TrashIcon size={24} />
                                                </Button>
                                            </div>
                                            <span className="caption-01 text-gray-7">
                                                {item.category} , {item.weight} , {item.dimensions}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center border border-gray-10">
                                                <Button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="sm-md outline-gray border-0!"
                                                >
                                                    <RemoveIcon />
                                                </Button>
                                                <span className="body-03 text-gray-1 min-w-[28px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="sm-md outline-gray border-0!"
                                                >
                                                    <AddIcon />
                                                </Button>
                                            </div>
                                            <span className="body-03 text-gray-1">
                                                ${item.price.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 md:px-10 lg:px-20 py-4 md:py-6 border-t border-gray-10">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <span className="body-01 text-gray-1">
                                    {t("subtotal_label")}
                                </span>
                                <span className="body-01 text-gray-1">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>
                            <Button
                                className="primary sm-md block"
                                href="/checkout"
                                onClick={onClose}
                            >
                                {t("checkout_label")}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartOverlay;