"use client";

import { useTranslations } from "next-intl";
import PackageCard, { type Package } from "./PackageCard";

const packages: Package[] = [
    {
        id: 1,
        name: "Imperial Reserve",
        category: "Royal",
        price: 149,
        image: "/images/package1.png",
        netWeight: "1 kg",
        dimensions: "20 x 15 x 10 cm",
        volume: "Premium large selection",
        shellType: "Whole, natural, lightly salted",
        bestFor: "Gifting, luxury gatherings",
    },
    {
        id: 2,
        name: "Golden Essence",
        category: "Refined",
        price: 99,
        image: "/images/package2.png",
        netWeight: "500 g",
        dimensions: "15 x 12 x 8 cm",
        volume: "Carefully selected, balanced size",
        shellType: "Whole, natural, lightly salted",
        bestFor: "Personal indulgence, special occasions",
    },
    {
        id: 3,
        name: "Emerald Delight",
        category: "Luxurious",
        price: 59,
        image: "/images/package3.png",
        netWeight: "250 g",
        dimensions: "12 x 10 x 6 cm",
        volume: "Compact, premium quality",
        shellType: "Whole, natural, lightly salted",
        bestFor: "Daily luxury, on-the-go treats",
    },
];

const PackagesSection = () => {
    const t = useTranslations();

    return (
        <div className="px-5 md:px-10 lg:px-20 pt-10 pb-10 md:pt-20 md:pb-15">
            <h2 className="headline-04 text-gray-1 text-center mb-12 md:mb-20">
                {t.rich("packages_title", {
                    br: () => <br />,
                })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-20">
                {packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
};

export default PackagesSection;