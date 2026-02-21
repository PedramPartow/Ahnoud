"use client";

import AddIcon from "@/icons/AddIcon";
import AddToCartIcon from "@/icons/AddToCartIcon";
import RemoveIcon from "@/icons/RemoveIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Button from "../general/Button";

export interface Package {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    netWeight: string;
    dimensions: string;
    volume: string;
    shellType: string;
    bestFor: string;
}

interface PackageCardProps {
    pkg: Package;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
    const t = useTranslations();
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex flex-col gap-10 h-full">
            <div className="flex flex-col gap-6 flex-1">
                    <div className="relative w-full h-[390px] overflow-hidden">
                        <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="subtitle-03 text-gray-1">{pkg.name}</span>
                        <span className="subtitle-04 text-gray-7">{pkg.category}</span>
                        <span className="body-01 text-gray-1">${pkg.price}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="body-02 text-gray-7 shrink-0">{t("net_weight_label")}</span>
                            <span className="body-02 text-gray-1 text-end">{pkg.netWeight}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="body-02 text-gray-7 shrink-0">{t("packaging_dimensions_label")}</span>
                            <span className="body-02 text-gray-1 text-end">{pkg.dimensions}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="body-02 text-gray-7 shrink-0">{t("volume_spec_label")}</span>
                            <span className="body-02 text-gray-1 text-end">{pkg.volume}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="body-02 text-gray-7 shrink-0">{t("shell_type_label")}</span>
                            <span className="body-02 text-gray-1 text-end">{pkg.shellType}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="body-02 text-gray-7 shrink-0">{t("best_for_label")}</span>
                            <span className="body-02 text-gray-1 text-end">{pkg.bestFor}</span>
                        </div>
                    </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-13 border border-gray-10">
                    <Button onClick={decrement} className="outline-gray sm-md">
                        <RemoveIcon />
                    </Button>
                    <div className="w-10 text-center">
                        <span className="text-gray-1 body-03">{quantity}</span>
                    </div>
                    <Button onClick={increment} className="outline-gray sm-md">
                        <AddIcon />
                    </Button>
                </div>
                <Button className="primary sm-md flex-1" href="/checkout">
                    <AddToCartIcon />
                    <span className="button-01 text-gray-13">{t("add_to_cart_label")}</span>
                </Button>
            </div>
        </div>
    );
};

export default PackageCard;
