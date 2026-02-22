"use client"

import AboutUsHeaderSection from "@/components/aboutUs/AboutUsHeaderSection";
import OurStorySection from "@/components/aboutUs/OurStorySection";
import OurVisionSection from "@/components/aboutUs/OurVisionSection";
import CheckoutHeaderSection from "@/components/chechout/CheckoutHeaderSection";
import StickyNav from "@/components/general/StickyNav";
import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import { useRef } from "react";

export default function ProductPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory bg-gray-13">
      <StickyNav scrollContainerRef={scrollRef} variant="product" />
      <section className="min-h-screen snap-start snap-always pt-2 md:pt-6">
        <CheckoutHeaderSection />
        <AboutUsHeaderSection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
        <OurStorySection />
      </section>
      <section className="min-h-screen snap-start snap-always bg-gray-13">
        <OurVisionSection />
      </section>
      <section className="min-h-screen snap-start snap-always flex flex-col">
        <HomeContactSection />
        <HomeFooter />
      </section>
    </div>
  );
};