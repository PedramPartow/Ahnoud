"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const features = [
    { image: "/images/Frame-4.svg", textKey: "vision_feature_2" },
    { image: "/images/Frame-3.svg", textKey: "vision_feature_3" },
  { image: "/images/Frame-2.svg", textKey: "vision_feature_1" },
] as const;

const OurVisionSection = () => {
  const t = useTranslations();

  return (
    <div className="pb-20 lg:pb-40">
        <div className="py-20 lg:py-40">
            <div className="px-5 md:px-10 lg:px-20  flex flex-col items-start md:items-center gap-6 md:gap-10 mb-8 md:mb-20">
                <span className="subtitle-04 text-gray-1">
                    {t("our_value_promise_label")}
                </span>
                <h2 className="headline-03 text-gray-1 md:text-center">
                    {t.rich("ordinary_description", { br: () => <br /> })}
                </h2>
            </div>
            <div className="lg:px-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                {features.map((feature, index) => (
                <div
                    key={index}
                    className="px-5 md:px-10 lg:px-0 flex items-center justify-between gap-4 lg:gap-6
                    py-6 lg:py-0 border-b border-b-gray-11 lg:border-b-0"
                >
                    <p className="subtitle-03 text-gray-1 lg:order-2 max-w-[60%] lg:max-w-none">
                    {t(feature.textKey)}
                    </p>
                    <div className="shrink-0 w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px] relative lg:order-1">
                    <Image
                        src={feature.image}
                        alt={t(feature.textKey)}
                        fill
                        sizes="(min-width: 1024px) 160px, (min-width: 768px) 120px, 80px"
                        className="object-contain"
                    />
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="px-5 md:px-10 lg:px-20 grid grid-cols-12 gap-y-6 md:gap-y-0 items-center">
            <div className="col-span-12 md:col-span-5 xl:col-span-4 flex flex-col gap-6 md:gap-8 lg:gap-12">
            <span className="subtitle-04 text-gray-1">
                {t("global_reach_label")}
            </span>
            <h2 className="headline-02 text-gray-1">
                {t("delivering_luxury_worldwide")}
            </h2>
            </div>
            <div className="col-span-12 md:col-span-7 xl:col-span-3 xl:col-start-6 flex items-center justify-center">
            <div className="relative w-[335px] h-[335px]">
                <Image
                src="/images/Frame-1.svg"
                alt="Globe illustration"
                fill
                sizes="335px"
                className="object-cover"
                />
            </div>
            </div>
            <div className="md:mt-6 xl:mt-0 col-span-12 md:col-span-12 xl:col-span-4 md:col-start-1 xl:col-start-9 flex items-center">
            <p className="subtitle-03 text-gray-1">
                {t("global_reach_desc")}
            </p>
            </div>
        </div>
    </div>
  );
};

export default OurVisionSection;