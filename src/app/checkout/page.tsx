"use client";

import StickyNav from "@/components/general/StickyNav";
import HomeFooter from "@/components/home/HomeFooter";
import CheckoutHeaderSection from "@/components/chechout/CheckoutHeaderSection";
import CheckoutFormSection from "@/components/chechout/CheckoutFormSection";
import { useRef } from "react";

export default function CheckoutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto bg-gray-13">
      <StickyNav scrollContainerRef={scrollRef} variant="home" />
      <div className="w-full block pt-2 md:pt-6 pb-20 md:pb-40">
        <CheckoutHeaderSection />
        <div className="mt-8 md:mt-16 w-full block">
          <CheckoutFormSection />
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}
