"use client";

import ArrowRightUpIcon from "@/icons/ArrowRightUpIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
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
    image: "/images/Pistachios.png",
    description:
      "Ahnoud pistachios are handpicked, perfectly roasted, and available in luxurious packaging of various sizes to suit every occasion. Enjoy unmatched quality and flavor in every bite.",
  },
  {
    id: 2,
    name: "Saffron",
    image: "/images/product2.png",
    description:
      "Premium saffron threads carefully sourced and selected for their rich aroma, vibrant color, and exceptional flavor that elevates every dish.",
  },
  {
    id: 3,
    name: "Dates",
    image: "/images/product3.png",
    description:
      "Handpicked premium dates from the finest farms, offering natural sweetness and rich texture in every luxurious bite.",
  },
];

const HomeProductSliderSection = () => {
  const t = useTranslations();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center pt-10 pb-34 md:py-14 lg:py-55">
      <div className="w-full flex justify-between items-center md:hidden mb-18">
        <span className="text-gray-1 subtitle-04">{t('our_products_label')}</span>
        <span className="text-gray-1 subtitle-04">{t('our_pride_label')}</span>
      </div>
      <div className="w-full grid grid-cols-12 relative">
        <span className="hidden md:block text-gray-1 subtitle-04 absolute left-0 top-1/2">{t('our_products_label')}</span>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={600}
          loop
          className="px-4! md:px-6! lg:px-10! py-6! lg:py-10! w-full lg:w-5/12 bg-gray-1 col-span-12 md:col-span-6 md:col-start-4 lg:col-span-12 lg:col-start-1 lg:mx-auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col items-center gap-4! md:gap-6! lg:gap-8! relative">
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
                <Image
                    src={product.image}
                    alt={product.name}
                    width={489}
                    height={275}
                    sizes="(max-width: 768px) 100vw, 489px"
                    className="object-cover w-full h-[275px] md:w-[489px]"
                  />
                <p className="body-02 text-gray-13 text-center">
                  {product.description}
                </p>
                <div className="flex md:hidden justify-center w-full">
                  <Button className="dark sm-md" href="/product">
                    {t('discover_more_button')}
                    <ArrowRightUpIcon />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden md:block absolute end-[12%] lg:end-[20%] top-1/2 -translate-y-1/2 z-10">
          <Button className="blur-gray sm-md" href="/product">
            {t('discover_more_button')}
            <ArrowRightUpIcon />
          </Button>
        </div>
        <span className="hidden md:block text-gray-1 subtitle-04 absolute right-0 top-1/2">{t('our_pride_label')}</span>
      </div>
    </div>
  );
};

export default HomeProductSliderSection;