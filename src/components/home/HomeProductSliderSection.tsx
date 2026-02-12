"use client";

import ArrowRightUpIcon from "@/icons/ArrowRightUpIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../general/Button";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Pistachios",
    image: "/images/home-production.png",
    description:
      "Ahnoud pistachios are handpicked, perfectly roasted, and available in luxurious packaging of various sizes to suit every occasion. Enjoy unmatched quality and flavor in every bite.",
  },
  {
    id: 2,
    name: "Saffron",
    image: "/images/home-production.png",
    description:
      "Premium saffron threads carefully sourced and selected for their rich aroma, vibrant color, and exceptional flavor that elevates every dish.",
  },
  {
    id: 3,
    name: "Dates",
    image: "/images/home-production.png",
    description:
      "Handpicked premium dates from the finest farms, offering natural sweetness and rich texture in every luxurious bite.",
  },
];

const HomeProductSliderSection = () => {
  const t = useTranslations();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-16 md:py-20">
      <div className="w-full grid grid-cols-12">
        <span className="hidden md:block text-gray-1 subtitle-04 absolute left-20 top-1/2">{t('our_products_label')}</span>
        <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              speed={600}
              loop
              className="px-4! md:px-10! py-4! md:py-10! w-full bg-gray-1 col-span-12 md:col-span-5 col-start-1 md:col-start-5"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex flex-col items-center gap-4! md:gap-8! relative">
                    <div className="flex items-center justify-center">
                      <span className="body-03 text-gray-13">
                        {String(activeIndex + 1).padStart(2, "0")}
                        &nbsp;
                        <span className="body-03 text-gray-5">
                         / {String(products.length).padStart(2, "0")}
                        </span>
                      </span>
                    </div>
                    <h2 className="headline-05 text-gray-13 text-center">
                      {product.name}
                    </h2>
                    <div className="w-full h-full ">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={303}
                        height={170}
                        className="object-cover w-full h-full md:w-[489px] md:h-[275px]"
                      />
                    </div>
                    <p className="body-02 text-gray-13 text-center">
                      {product.description}
                    </p>
                    <div className="block md:hidden flex justify-center w-full">
                      <Button className="dark sm-md" href="/">
                        {t('discover_more_button')}
                        <ArrowRightUpIcon />
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
        <div className="hidden md:block absolute right-0 top-1/2 -translate-x-[170%] -translate-y-1/2 z-10">
          <Button className="blur-gray sm-md" href="/">
            {t('discover_more_button')}
            <ArrowRightUpIcon />
          </Button>
        </div>
        <span className="hidden md:block text-gray-1 subtitle-04 absolute right-20 top-1/2">{t('our_pride_label')}</span>
      </div>
      {/* <div className="flex items-center gap-6 mt-10">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-10 text-gray-1 hover:bg-gray-13-alpha-48 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 h-2 bg-gray-1"
                  : "w-2 h-2 bg-gray-1-alpha-20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-10 text-gray-1 hover:bg-gray-13-alpha-48 transition-colors cursor-pointer"
        >
          <ArrowRightIcon size={20} />
        </button>
      </div> */}
    </div>
  );
};

export default HomeProductSliderSection;