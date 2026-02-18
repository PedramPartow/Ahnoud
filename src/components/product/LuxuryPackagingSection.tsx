import { useTranslations } from "next-intl";
import Image from "next/image";

const LuxuryPackagingSection = () => {
    const t = useTranslations();
    return(
        <div className="bg-gray-13 px-5 md:px-10 lg:px-20 pt-10 md:pt-15">
            <div className="grid">
                <div className="col-span-12 md:col-span-2">
                    <h2 className="headline-06 text-gray-1">{t('luxury_packaging_title')}</h2>
                </div>
                <div className="col-span-12 md:col-span-10">
                    <span className="subtitle-01 text-gray-10">
                        <Image src="/images/Star.svg" width={45} height={45} alt="star" className="inline-block align-middle me-2 w-6 h-6 md:w-[45px] md:h-[45px]" />
                        {t.rich('packaging_description', {
                            brand: (chunks) => <span className="text-gray-1 subtitle-01">{chunks}</span>
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LuxuryPackagingSection;