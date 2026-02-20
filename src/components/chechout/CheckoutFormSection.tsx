"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import AppleIcon from "@/icons/AppleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../general/Button";
import type { CartItem } from "../general/CartOverlay";

const checkoutCartItems: CartItem[] = [
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
        id: 3,
        name: "Imperial Threads",
        category: "Royal",
        weight: "10 g",
        dimensions: "10 x 7 x 5 cm",
        price: 259,
        quantity: 1,
        image: "/images/Dates.png",
    },
];

const RadioDot = ({ selected }: { selected: boolean }) => (
    <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            selected ? "border-gray-1" : "border-gray-7"
        }`}
    >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-gray-1" />}
    </div>
);

const PayPalLogo = () => (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16.27 4.73C15.23 3.53 13.3 3 10.8 3H5.04C4.54 3 4.12 3.36 4.05 3.86L1.72 19.02C1.67 19.38 1.95 19.7 2.31 19.7H6.24L7.2 13.64L7.17 13.83C7.24 13.33 7.65 12.97 8.15 12.97H10.03C14.06 12.97 17.18 11.31 18.11 6.56C18.14 6.41 18.16 6.27 18.18 6.13C18.06 6.07 18.06 6.07 18.18 6.13C18.44 5.47 18.27 4.98 16.27 4.73Z" fill="#27346A"/>
        <path d="M18.18 6.13C18.16 6.27 18.14 6.41 18.11 6.56C17.18 11.31 14.06 12.97 10.03 12.97H8.15C7.65 12.97 7.24 13.33 7.17 13.83L5.98 21.42C5.94 21.72 6.17 21.99 6.47 21.99H9.78C10.22 21.99 10.6 21.67 10.66 21.23L10.69 21.08L11.35 17.01L11.39 16.81C11.45 16.37 11.83 16.05 12.27 16.05H12.82C16.35 16.05 19.1 14.59 19.9 10.39C20.24 8.61 20.06 7.12 19.14 6.06C18.86 5.74 18.54 5.47 18.18 6.13Z" fill="#2790C3"/>
    </svg>
);

const GooglePayLogo = () => (
    <span className="body-03 text-gray-1 font-medium tracking-tight">
        G <span className="text-gray-5">Pay</span>
    </span>
);

const CheckoutFormSection = () => {
    const t = useTranslations();
    const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
    const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "paypal" | "apple_pay" | "google_pay">("credit_card");

    const items = checkoutCartItems;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = deliveryMethod === "express" ? 50 : 0;
    const discount = 0;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full px-5 md:px-10 lg:px-20">
            <h1 className="headline-01 text-gray-1">
                {t("checkout_label")}
            </h1>

            <div className="grid grid-cols-12 mt-12 md:mt-20">
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-10 gap-12 md:gap-20">
                    <div className="flex flex-col gap-8">
                        <h2 className="subtitle-03 text-gray-1">{t("personal_information_label")}</h2>
                        <TextField
                            fullWidth
                            autoComplete="name"
                            label={t("full_name_label")}
                            variant="standard"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                fullWidth
                                autoComplete="email"
                                label={t("email_label")}
                                variant="standard"
                                type="email"
                            />
                            <div className="flex gap-3 items-end">
                                {/* <div className="flex items-center gap-1 pb-4 border-b border-[var(--color-gray-1-alpha-20)] shrink-0 cursor-pointer">
                                    <span className="body-03 text-gray-7">+971</span>
                                    <ArrowDownIcon size={16} color="var(--color-gray-7)" />
                                </div> */}
                                <TextField
                                    fullWidth
                                    autoComplete="tel"
                                    label={t("phone_number_label")}
                                    variant="standard"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <h2 className="subtitle-04 text-gray-1">{t("shipping_information_label")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-gray-1-alpha-20)] cursor-pointer">
                                <span className="body-03 text-gray-7">{t("country_region_label")}</span>
                                <ArrowDownIcon size={16} color="var(--color-gray-7)" />
                            </div>
                            <TextField
                                fullWidth
                                label={t("city_label")}
                                variant="standard"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                fullWidth
                                label={t("address_label")}
                                variant="standard"
                            />
                            <TextField
                                fullWidth
                                label={t("zip_postal_code_label")}
                                variant="standard"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <h2 className="subtitle-04 text-gray-1">{t("delivery_label")}</h2>
                        <div className="flex flex-col md:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod("standard")}
                                className={`flex items-start justify-between gap-3 p-4 border cursor-pointer flex-1 text-start transition-colors ${
                                    deliveryMethod === "standard" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <RadioDot selected={deliveryMethod === "standard"} />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="body-03 text-gray-1">{t("standard_delivery_label")}</span>
                                        <span className="caption-01 text-gray-7">{t("standard_delivery_desc")}</span>
                                    </div>
                                </div>
                                <span className="body-03 text-gray-1 shrink-0">{t("free_label")}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod("express")}
                                className={`flex items-start justify-between gap-3 p-4 border cursor-pointer flex-1 text-start transition-colors ${
                                    deliveryMethod === "express" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <RadioDot selected={deliveryMethod === "express"} />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="body-03 text-gray-1">{t("express_shipping_label")}</span>
                                        <span className="caption-01 text-gray-7">{t("express_shipping_desc")}</span>
                                    </div>
                                </div>
                                <span className="body-03 text-gray-1 shrink-0">$50</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <h2 className="subtitle-04 text-gray-1">{t("payment_label")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("credit_card")}
                                className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "credit_card" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <RadioDot selected={paymentMethod === "credit_card"} />
                                <span className="body-03 text-gray-1">{t("credit_card_label")}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("paypal")}
                                className={`flex items-center justify-between gap-3 p-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "paypal" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioDot selected={paymentMethod === "paypal"} />
                                    <span className="body-03 text-gray-1">{t("paypal_label")}</span>
                                </div>
                                <PayPalLogo />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("apple_pay")}
                                className={`flex items-center justify-between gap-3 p-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "apple_pay" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioDot selected={paymentMethod === "apple_pay"} />
                                    <span className="body-03 text-gray-1">{t("apple_pay_label")}</span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <AppleIcon size={18} color="var(--color-gray-1)" />
                                    <span className="body-03 text-gray-1">Pay</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col gap-4">
                        <Button className="primary sm-md block">
                            {t("pay_and_place_order_label")}
                        </Button>
                        <p className="caption-01 text-gray-7 text-center">
                            {t.rich("terms_agreement_text", {
                                terms: (chunks) => (
                                    <a href="#" className="text-gray-1 underline">{chunks}</a>
                                ),
                                privacy: (chunks) => (
                                    <a href="#" className="text-gray-1 underline">{chunks}</a>
                                ),
                            })}
                        </p>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="subtitle-03 text-gray-1">{t("cart_label")}</h2>
                        <span className="body-03 text-primary-7">{totalItems} {t("items_label")}</span>
                    </div>

                    <div className="flex flex-col">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 py-6 not-last:border-b border-gray-10">
                                <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="100px"
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                        <span className="subtitle-04 text-gray-1 block">{item.name}</span>
                                        <span className="caption-01 text-gray-7 block">
                                            {item.category} , {item.weight} , {item.dimensions}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="caption-01 text-gray-7">
                                            {t("qty_label")} {item.quantity}
                                        </span>
                                        <span className="body-03 text-gray-1">
                                            ${item.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-gray-10">
                        <span className="body-03 text-gray-7">{t("promo_code_label")}</span>
                        <Button className="outline-gray sm">
                            {t("apply_label")}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 py-4 border-t border-gray-10">
                        <div className="flex items-center justify-between">
                            <span className="body-03 text-gray-7">{t("shipping_label")}</span>
                            <span className="body-03 text-gray-1">
                                {shippingCost === 0 ? t("free_label") : `$${shippingCost.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="body-03 text-gray-7">{t("discount_label")}</span>
                            <span className="body-03 text-gray-1">${discount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-10">
                        <span className="subtitle-03 text-gray-1">{t("subtotal_label")}</span>
                        <span className="subtitle-03 text-gray-1">
                            ${(subtotal + shippingCost - discount).toLocaleString()}
                        </span>
                    </div>

                    <div className="flex lg:hidden flex-col gap-4 mt-8">
                        <Button className="primary sm-md block">
                            {t("pay_and_place_order_label")}
                        </Button>
                        <p className="caption-01 text-gray-7 text-center">
                            {t.rich("terms_agreement_text", {
                                terms: (chunks) => (
                                    <a href="#" className="text-gray-1 underline">{chunks}</a>
                                ),
                                privacy: (chunks) => (
                                    <a href="#" className="text-gray-1 underline">{chunks}</a>
                                ),
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutFormSection;
