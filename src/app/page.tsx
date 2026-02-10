import HomeHeaderSection from "@/components/home/HomeHeaderSection";

export default function HomePage() {

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section 
        className="min-h-screen snap-start snap-always grid bg-gray-13 pt-2 md:pt-6 overflow-hidden"
      >
        <div className="self-start z-20 w-full px-5 md:px-20">
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
