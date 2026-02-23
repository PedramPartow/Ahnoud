"use client"

import CheckoutHeaderSection from "@/components/chechout/CheckoutHeaderSection";
import StickyNav from "@/components/general/StickyNav";
import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import PrivacyPolicySection from "@/components/privacyPolicy/PrivacyPolicySection";
import { useRef } from "react";

export default function ProductPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory bg-gray-13">
      <StickyNav scrollContainerRef={scrollRef} variant="product" />
      <section className="min-h-screen snap-start snap-always pt-2 md:pt-6">
        <CheckoutHeaderSection />
        <PrivacyPolicySection />
      </section>
      <section className="min-h-screen snap-start snap-always flex flex-col">
        <HomeContactSection />
        <HomeFooter />
      </section>
    </div>
  );
};