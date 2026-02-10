import HomeHeaderSection from "@/components/home/HomeHeaderSection";
import Image from "next/image";


export default function HomePage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section 
        className="relative min-h-screen md:h-[150vh] snap-start snap-always flex items-start justify-center px-5 md:px-20
        bg-gray-13 pt-2 md:pt-6"
      >
        <Image 
          src="/images/section-one.png" 
          alt="Home Header Section"
          height={756}
          width={570}
          className="absolute inset-0 m-auto w-full h-[326px] w-[285px] md:h-[756px] md:w-[570px] object-cover brightness-50" 
          priority
        />
        <div className="relative z-10 w-full">
          <HomeHeaderSection />
        </div>
      </section>

      <section className="h-[150vh] snap-start snap-always flex items-center justify-center bg-gray-12">
        <span className="headline-06 text-gray-1">Section 2</span>
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
