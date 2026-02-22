"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const OurStorySection = () => {
  const t = useTranslations();

  return (
    <div className="px-5 md:px-10 lg:px-20 pb-10 md:pb-20 pt-20 md:pt-40">
      <span className="subtitle-04 text-gray-1">
        {t("our_story_title")}
      </span>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-6 mt-12 md:mt-6">
        <p className="subtitle-03 text-gray-1 md:col-span-3 md:self-start">
          {t("our_story_description_first")}
        </p>

        <div className="relative h-[482px] md:h-[682px] md:col-span-6 overflow-hidden">
          <Image
            src="/images/tower2.png"
            alt="Burj Khalifa, Dubai"
            fill
            className="object-cover brightness-[0.7]"
          />
        </div>

        <p className="subtitle-03 text-gray-1 md:col-span-3 md:self-end">
          {t("our_story_description_second")}
        </p>
      </div>
    </div>
  );
};

export default OurStorySection;