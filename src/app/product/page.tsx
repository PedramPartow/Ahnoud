"use client"

import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import StickyNav from "@/components/general/StickyNav";
import LuxuryPackagingSection from "@/components/product/LuxuryPackagingSection";
import PackagesSection from "@/components/product/PackagesSection";
import ProductDescriptionSection from "@/components/product/ProductDescriptionSection";
import ProductDescriptionSlider from "@/components/product/ProductDescriptionSlider";
import OtherProductsSection from "@/components/product/OtherProductsSection";
import ProductHeaderSection from "@/components/product/ProductHeaderSection";
import Image from "next/image";
import { useRef } from "react";

export default function ProductPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
      <StickyNav scrollContainerRef={scrollRef} variant="product" />
      <section className="min-h-screen snap-start snap-always pt-2 md:pt-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/Pistachios.png"
            alt="productions cover"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 w-full block">
          <ProductHeaderSection />
        </div>
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
        <ProductDescriptionSection />
        <ProductDescriptionSlider />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13 relative overflow-hidden">
        <PackagesSection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13 relative overflow-hidden">
        <LuxuryPackagingSection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
        <OtherProductsSection />
      </section>
      <section className="min-h-screen snap-start snap-always flex flex-col">
        <HomeContactSection />
        <HomeFooter />
      </section>
    </div>
  );
};