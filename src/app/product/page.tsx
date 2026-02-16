import HomeContactSection from "@/components/home/HomeContactSection";
import HomeFooter from "@/components/home/HomeFooter";
import ProductHeaderSection from "@/components/product/ProductHeaderSection";
import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section
        className="min-h-screen snap-start snap-always pt-2 md:pt-6 overflow-hidden relative"
      >
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
        <div className="relative z-10 w-full block px-5 md:px-10 lg:px-20">
          <ProductHeaderSection />
        </div>
      </section>

      {/* Product content goes here */}

      <section className="min-h-screen snap-start snap-always flex flex-col">
        <HomeContactSection />
        <HomeFooter />
      </section>
    </div>
  );
};