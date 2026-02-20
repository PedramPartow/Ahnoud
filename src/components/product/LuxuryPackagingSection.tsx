import { useTranslations } from "next-intl";
import Image from "next/image";

const LuxuryPackagingSection = () => {
    const t = useTranslations();
    const features = [
        { icon: "/images/Frame-4.svg", titleKey: "unmatched_quality_title", descKey: "unmatched_quality_description" },
        { icon: "/images/Frame-2.svg", titleKey: "exquisite_packaging_title", descKey: "exquisite_packaging_description" },
        { icon: "/images/Frame-3.svg", titleKey: "global_prestige_title", descKey: "global_prestige_description" },
    ];

    return (
        <>
            <div className="px-5 md:px-10 lg:px-20 py-10 md:py-20">
                <div className="grid grid-cols-12 gap-8 md:gap-16">
                    <div className="col-span-12 md:col-span-2">
                        <h2 className="subtitle-04 text-gray-1">{t('luxury_packaging_label')}</h2>
                    </div>
                    <div className="col-span-12 md:col-span-10 flex flex-col xl:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32">
                        <div className="w-[208px] h-[293px] md:w-[380px] md:h-[536px] lg:w-[460px] lg:h-[650px] relative -rotate-12 shrink-0">
                            <Image
                                src="/images/product3.png"
                                alt="Luxury Packaging"
                                fill
                                sizes="(max-width: 768px) 208px, (max-width: 1024px) 380px, 460px"
                                className="object-cover"
                            />
                        </div>
                        <p className="subtitle-01 text-gray-10 relative z-10">
                            <Image
                                src="/images/Star.svg"
                                width={45}
                                height={45}
                                alt="star"
                                className="inline-block align-middle me-2 w-6 h-6 md:w-[45px] md:h-[45px]"
                            />
                            {t.rich('packaging_description', {
                                brand: (chunks) => <span className="text-gray-1 subtitle-01">{chunks}</span>
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-5 md:px-10 lg:px-20 py-10 md:py-20">
                <span className="subtitle-04 text-gray-1">{t('why_ahnoud_label')}</span>
                <h3 className="headline-02 text-gray-1 mt-6 md:mt-10">
                    {t.rich('ordinary_description', {
                        br: () => <br />
                    })}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 mt-10 md:mt-20">
                    {features.map((feature) => (
                        <div key={feature.titleKey} className="flex items-start gap-6">
                            <Image
                                src={feature.icon}
                                alt={t(feature.titleKey)}
                                width={80}
                                height={80}
                                className="w-20 h-20 md:w-40 md:h-40 shrink-0"
                            />
                            <div>
                                <h4 className="subtitle-03 text-gray-1">{t(feature.titleKey)}</h4>
                                <p className="body-01 text-gray-7 mt-1">{t(feature.descKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LuxuryPackagingSection;