import HomeHeaderSection from "@/components/home/HomeHeaderSection";
import HomeProductSliderSection from "@/components/home/HomeProductSliderSection";
import Image from "next/image";

export default function HomePage() {

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section 
        className="min-h-screen snap-start snap-always bg-gray-13 pt-2 md:pt-6 overflow-hidden"
      >
        <div className="relative z-10 w-full block px-5 md:px-20">
          <HomeHeaderSection />
        </div>
      </section>

      <section className="min-h-screen snap-start snap-always relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/home-production.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 w-full block px-5 md:px-20">
          <HomeProductSliderSection />
        </div>
      </section>

      <section className="h-screen snap-start snap-always flex items-center justify-center bg-gray-11">
        <span className="headline-06 text-gray-1">Section 3</span>
      </section>

      <section className="h-screen snap-start snap-always flex items-center justify-center bg-gray-12">
        <span className="headline-06 text-gray-1">Section 4</span>
      </section>

      <section className="h-screen snap-start snap-always flex items-center justify-center bg-gray-13">
        <span className="headline-06 text-gray-1">Section 5</span>
      </section>
    </div>
  );
}