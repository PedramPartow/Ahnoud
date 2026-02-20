"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
    { src: "/images/product2.png", alt: "Premium packaging" },
    { src: "/images/product3.png", alt: "Special edition" },
    { src: "/images/Pistachios.png", alt: "Luxury gift box" },
    { src: "/images/pistachio.png", alt: "Pistachio selection" },
];

const ProductDescriptionSlider = () => {
    const [gap, setGap] = useState(48);
    const [offset, setOffset] = useState(190);

    useEffect(() => {
        const update = () => {
            const md = window.innerWidth >= 768;
            setGap(md ? 170 : 48);
            setOffset(md ? 240 : 190);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div className="w-full flex items-center overflow-hidden pb-20">
            <Swiper
                key={gap}
                modules={[Autoplay, FreeMode]}
                slidesPerView="auto"
                spaceBetween={gap}
                freeMode={{ enabled: true, momentum: false }}
                loop
                allowTouchMove={false}
                autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
                speed={5000}
                className="product-marquee w-full pointer-events-none"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i} className="!w-auto">
                        <div style={{ marginTop: i % 2 !== 0 ? offset : 0 }}>
                            <div className="relative overflow-hidden w-[211px] h-[211px] md:w-[422px] md:h-[422px]">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    sizes="(max-width: 768px) 280px, 440px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductDescriptionSlider;