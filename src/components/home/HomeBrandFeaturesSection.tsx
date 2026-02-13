import { useTranslations } from "next-intl";
import Image from "next/image";
import HomeFaqSection from "./HomeFaqSection";
import HomeProductsList from "./HomeProductsList";

const features = [
  {
    image: "/images/Frame-4.svg",
    titleKey: "crafted_to_perfection_title",
    descKey: "crafted_to_perfection_desc",
  },
  {
    image: "/images/Frame-3.svg",
    titleKey: "from_dubai_title",
    descKey: "from_dubai_desc",
  },
  {
    image: "/images/Frame-2.svg",
    titleKey: "premium_quality_title",
    descKey: "premium_quality_desc",
  },
] as const;

const HomeBrandFeaturesSection = () => {
  const t = useTranslations();

  return (
    <div className="w-full flex flex-col justify-center py-16 md:py-40 gap-20 md:gap-25">
      <div className="w-full grid grid-cols-12 gap-y-12 md:gap-y-0">
        <div className="col-span-12 md:col-span-6">
            <div className="flex flex-col md:flex-row items-start w-full gap-6">
                <span className="subtitle-04 text-gray-1">
                    {t("ahnoud_features_label")}
                </span>
                <h2 className="headline-02 text-gray-1">
                    {t("what_makes_ahnoud_exceptional")}
                </h2>
            </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col md:gap-12">
          {features.map((feature, index) => (
            <div 
                key={index} 
                className="flex items-end justify-between md:justify-start md:items-center flex-row-reverse py-6 md:py-0
                md:flex-row gap-5 md:gap-6 border-t border-t-tertiary-13 last:border-b last:border-b-tertiary-13 md:border-t-0 md:last:border-b-0"
            >
              <div className="shrink-0 w-[80px] h-[80px] md:w-[220px] md:h-[220px] relative">
                <Image
                  src={feature.image}
                  alt={t(feature.titleKey)}
                  fill
                  sizes="(min-width: 768px) 220px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="subtitle-03 text-gray-1">
                  {t(feature.titleKey)}
                </h3>
                <p className="body-03 text-gray-6">
                  {t(feature.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full grid grid-cols-12 gap-y-6 md:gap-y-0 items-center">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6 md:gap-12">
          <span className="subtitle-04 text-gray-1">
            {t("global_reach_label")}
          </span>
          <h2 className="headline-02 text-gray-1">
            {t("delivering_luxury_worldwide")}
          </h2>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-6 flex items-center justify-center">
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
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-center">
          <p className="subtitle-03 text-gray-1">
            {t("global_reach_desc")}
          </p>
        </div>
      </div>
      <div className="-mx-5 md:-mx-10 lg:-mx-20 h-[1px] bg-tertiary-11"></div>
      <HomeFaqSection />
      <div className="products">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16">
          <span className="subtitle-04 text-gray-1">{t('overview_products_label')}</span>
          <span className="subtitle-04 text-gray-1">{t('discover_their_details_label')}</span>
        </div>
        <HomeProductsList />
      </div>
    </div>
  );
};

export default HomeBrandFeaturesSection;