"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
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
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            selected ? "border-gray-1 bg-gray-1" : "border-gray-7"
        }`}
    >
        {selected && <div className="w-2 h-2 rounded-full bg-gray-13" />}
    </div>
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

            <div className="grid grid-cols-12 mt-12 md:mt-20 gap-y-12">
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-10 gap-12 md:gap-20">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <h2 className="subtitle-03 text-gray-1">{t("personal_information_label")}</h2>
                        <TextField
                            fullWidth
                            autoComplete="name"
                            label={t("full_name_label")}
                            variant="standard"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <TextField
                                fullWidth
                                autoComplete="email"
                                label={t("email_label")}
                                variant="standard"
                                type="email"
                            />
                            <div className="flex gap-3 items-end">
                                <div className="flex items-center gap-1 pb-4 border-b border-[var(--color-gray-1-alpha-20)] shrink-0 cursor-pointer">
                                    <span className="body-03 text-gray-7">+971</span>
                                    <ArrowDownIcon size={16} color="var(--color-gray-7)" />
                                </div>
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

                    <div className="flex flex-col gap-6 md:gap-8">
                        <h2 className="subtitle-03 text-gray-1">{t("shipping_information_label")}</h2>
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
                        <h2 className="subtitle-03 text-gray-1">{t("delivery_label")}</h2>
                        <div className="flex flex-col xl:flex-row gap-2 md:gap-6">
                            <button
                                type="button"
                                onClick={() => setDeliveryMethod("standard")}
                                className={`flex items-start justify-between gap-3 p-4 border cursor-pointer flex-1 text-start transition-colors ${
                                    deliveryMethod === "standard" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <RadioDot selected={deliveryMethod === "standard"} />
                                    <div className="flex flex-col gap-1">
                                        <span className="subtitle-04 text-gray-1">{t("standard_delivery_label")}</span>
                                        <span className="caption-01 text-gray-5">{t("standard_delivery_desc")}</span>
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

                    <div className="flex flex-col gap-6 md:gap-8">
                        <h2 className="subtitle-03 text-gray-1">{t("payment_label")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("credit_card")}
                                className={`flex items-center gap-4 py-4 md:py-6 px-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "credit_card" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <RadioDot selected={paymentMethod === "credit_card"} />
                                <span className="subtitle-04 text-gray-1">{t("credit_card_label")}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("paypal")}
                                className={`flex items-center justify-between gap-4 py-4 md:py-6 px-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "paypal" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <RadioDot selected={paymentMethod === "paypal"} />
                                    <span className="subtitle-04 text-gray-1">{t("paypal_label")}</span>
                                </div>
                                <Image
                                    src="/images/PayPal.svg"
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                    sizes="24px"
                                />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod("apple_pay")}
                                className={`flex items-center justify-between gap-1 py-4 md:py-6 px-4 border cursor-pointer transition-colors ${
                                    paymentMethod === "apple_pay" ? "border-gray-1" : "border-gray-10"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <RadioDot selected={paymentMethod === "apple_pay"} />
                                    <span className="subtitle-04 text-gray-1">{t("apple_pay_label")}</span>
                                </div>
                                <Image
                                    src="/images/ApplePay.svg"
                                    alt=""
                                    width={48}
                                    height={24}
                                    className="w-12 h-6"
                                    sizes="24px"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col gap-4 md:gap-6">
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

                <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="subtitle-03 text-gray-1">{t("cart_label")}</h2>
                        <span className="body-03 text-gray-7">{totalItems} {t("items_label")}</span>
                    </div>
                    <div className="flex flex-col">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 md:gap-6 py-6 border-b border-gray-10">
                                <div className="relative w-[80px] h-[80px] md:w-[160px] md:h-[160px] shrink-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="160px"
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="subtitle-04 text-gray-1 block mb-1">{item.name}</span>
                                        <span className="caption-01 text-gray-7 block">
                                            {item.category} , {item.weight} , {item.dimensions}
                                        </span>
                                    </div>
                                    <div className="flex items-center md:flex-col md:items-start mt-2 md:gap-2">
                                        <span className="caption-01 text-gray-7">
                                            {t("qty_label")} <span className="text-gray-1">{item.quantity}</span>
                                        </span>
                                        <span className="body-03 text-gray-1">
                                            ${item.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end gap-6 justify-between md:pt-10 mt-2 md:mt-0">
                        <TextField
                            fullWidth
                            autoComplete="promo"
                            label={t("promo_code_label")}
                            variant="standard"
                        />
                        <Button className="outline-gray sm">
                            {t("apply_label")}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-6">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-10">
                            <span className="body-03 text-gray-7">{t("shipping_label")}</span>
                            <span className="body-03 text-gray-1">
                                {shippingCost === 0 ? t("free_label") : `$${shippingCost.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-gray-10">
                            <span className="body-03 text-gray-7">{t("discount_label")}</span>
                            <span className="body-03 text-gray-1">${discount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="subtitle-03 text-gray-1">{t("subtotal_label")}</span>
                        <span className="subtitle-03 text-gray-1">
                            ${(subtotal + shippingCost - discount).toLocaleString()}
                        </span>
                    </div>

                    <div className="flex lg:hidden flex-col gap-4 md:gap-6 mt-12 md:mt-20">
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