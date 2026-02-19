import { useTranslations } from "next-intl";
import Image from "next/image";

const products = [
    { nameKey: "saffron_label", image: "/images/Saffron.png" },
    { nameKey: "dates_label", image: "/images/Dates.png" },
];

const OtherProductsSection = () => {
    const t = useTranslations();
    return (
        <div className="pt-10 md:pt-20">
            <div className="flex justify-between items-center mb-8 md:mb-12 px-5 md:px-10 lg:px-20">
                <span className="subtitle-04 text-gray-1">{t('other_products_label')}</span>
                <span className="subtitle-04 text-gray-1">{t('discover_their_details_label')}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {products.map((product) => (
                    <div key={product.nameKey} className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                            src={product.image}
                            alt={t(product.nameKey)}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="headline-03 text-gray-7">{t(product.nameKey)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OtherProductsSection;