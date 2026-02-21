"use client";

import CheckoutHeaderSection from "@/components/chechout/CheckoutHeaderSection";
import ContactUsSection from "@/components/contactUs/ContactUsSection";
import StickyNav from "@/components/general/StickyNav";
import HomeFooter from "@/components/home/HomeFooter";
import { useRef } from "react";

export default function ContactUsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto overflow-x-hidden bg-gray-13">
      <StickyNav scrollContainerRef={scrollRef} variant="home" />
      <div className="w-full block pt-2 md:pt-6 relative">
        <CheckoutHeaderSection />
        <ContactUsSection />
      </div>
      <HomeFooter />
    </div>
  );
}
