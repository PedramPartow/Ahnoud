"use client";

import ArrowDownTailIcon from "@/icons/ArrowDownTailIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";

const collageImages = [
  {
    src: "/images/tower1.png",
    alt: "Burj Khalifa, Dubai",
    width: 200,
    height: 268,
    position:
      "top-[6%] left-[-4%] md:top-[15%] md:left-[4%] lg:left-[3%]",
    size: "w-[110px] h-[140px] md:w-[140px] md:h-[187px] lg:w-[273px] lg:h-[350px]",
    rotate: "-rotate-7",
  },
  {
    src: "/images/Saffron.png",
    alt: "Premium saffron packaging",
    width: 160,
    height: 224,
    position:
      "top-[2%] left-1/2 -translate-x-1/2 md:top-[5%]",
    size: "w-[111px] h-[111px] md:w-[140px] md:h-[187px] lg:w-[273px] lg:h-[273px]",
    rotate: "rotate-6",
  },
  {
    src: "/images/product3.png",
    alt: "Luxury gift packaging",
    width: 180,
    height: 240,
    position:
      "top-[6%] right-[-3%] md:top-[10%] md:right-[4%] lg:right-[3%]",
    size: "w-[93px] h-[93px] md:w-[135px] md:h-[180px] lg:w-[273px] lg:h-[350px]",
    rotate: "-rotate-5",
  },
  {
    src: "/images/Dates.png",
    alt: "Premium dates packaging",
    width: 190,
    height: 254,
    position:
      "bottom-[16%] left-[-2%] md:bottom-[6%] md:left-[7%] lg:left-[8%]",
    size: "w-[102px] h-[102px] md:w-[140px] md:h-[187px] lg:w-[273px] lg:h-[273px]",
    rotate: "rotate-4",
  },
  {
    src: "/images/tower3.png",
    alt: "Traditional Dubai architecture",
    width: 190,
    height: 254,
    position:
      "bottom-[16%] right-[-3%] md:bottom-[3%] md:right-[7%] lg:right-[8%]",
    size: "w-[113px] h-[145px] md:w-[140px] md:h-[187px] lg:w-[273px] lg:h-[350px]",
    rotate: "rotate-6",
  },
];

const AboutUsHeaderSection = () => {
  
  const t = useTranslations();

  return (
    <div className="relative flex flex-col items-center justify-center px-5 md:px-10 lg:px-20">
      {collageImages.map((img) => (
        <div
          key={img.src}
          className={`absolute overflow-hidden ${img.position} ${img.size} ${img.rotate}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="w-full h-full object-cover brightness-[0.7]"
          />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center mt-[125px] mb-20 lg:mb-40 lg:mt-[290px] gap-6 md:gap-12">
        <h1 className="headline-01 text-gray-1 md:max-w-[80%]">
            {t("modern_luxury_label")}
        </h1>
        <p className="body-01 text-gray-1 md:max-w-[40%]">
            {t("modern_luxury_description")}
        </p>
      </div>
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center z-10 gap-1 mb-20 md:mb-40">
        <span className="caption-01 text-gray-1 text-center md:text-start">
          {t.rich("scroll_to_learn_more_label", {
            br: () => <br />,
          })}
        </span>
        <ArrowDownTailIcon size={24} color="var(--color-gray-1)" />
      </div>
    </div>
  );
};

export default AboutUsHeaderSection;
