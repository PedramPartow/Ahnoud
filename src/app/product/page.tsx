"use client"

import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import LuxuryPackagingSection from "@/components/product/LuxuryPackagingSection";
import PackagesSection from "@/components/product/PackagesSection";
import ProductDescriptionSection from "@/components/product/ProductDescriptionSection";
import ProductDescriptionSlider from "@/components/product/ProductDescriptionSlider";
import OtherProductsSection from "@/components/product/OtherProductsSection";
import ProductHeaderSection from "@/components/product/ProductHeaderSection";
import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section className="min-h-screen snap-start snap-always pt-2 md:pt-6 overflow-hidden relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/home-production.png"
            alt="productions cover"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
        </div>
        <ProductHeaderSection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
        <ProductDescriptionSection />
        <ProductDescriptionSlider />
      </section>
      <section className="min-h-screen snap-start snap-always">
        <PackagesSection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
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