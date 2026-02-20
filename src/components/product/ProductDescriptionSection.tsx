import { useTranslations } from "next-intl";
import Image from "next/image";

const ProductDescriptionSection = () => {
    const t = useTranslations();

    return (
        <div className="w-full px-5 md:px-10 lg:px-20 py-16 md:py-40 text-start md:max-w-6xl mx-auto">
            <span className="subtitle-01 text-gray-10">
                <Image src="/images/Star.svg" width={45} height={45} alt="star" className="inline-block align-middle me-2 w-6 h-6 md:w-[45px] md:h-[45px]" />
                {t.rich('quantity_label', {
                    brand: (chunks) => <span className="text-gray-1 subtitle-01">{chunks}</span>
                })}
            </span>
        </div>
    )
}

export default ProductDescriptionSection;