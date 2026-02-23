"use client";

import HomeBrandFeaturesSection from "@/components/home/HomeBrandFeaturesSection";
import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeaderSection from "@/components/home/HomeHeaderSection";
import HomeProductSliderSection from "@/components/home/HomeProductSliderSection";
import StickyNav from "@/components/general/StickyNav";
import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
      <StickyNav scrollContainerRef={scrollRef} variant="home" />
      <section 
        className="min-h-screen snap-start snap-always bg-gray-13 pt-2 md:pt-6 overflow-hidden"
      >
        <div className="relative z-10 w-full block px-5 md:px-10 lg:px-20">
          <HomeHeaderSection />
        </div>
      </section>

      <section className="min-h-screen snap-start snap-always relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/pistachios.png"
            alt="productions cover"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 w-full block px-5 md:px-10 lg:px-20">
          <HomeProductSliderSection />
        </div>
      </section>

      <section className="min-h-screen snap-start snap-always relative overflow-hidden bg-gray-13">
        <div className="relative z-10 w-full block md:px-10 lg:px-20">
          <HomeBrandFeaturesSection />
        </div>
      </section>

      <section className="min-h-screen snap-start snap-always flex flex-col">
        <HomeContactSection />
        <HomeFooter />
      </section>
    </div>
  );
}