import HomeHeaderSection from "@/components/home/HomeHeaderSection";

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section 
        className="relative h-screen snap-start snap-always flex items-center justify-center bg-cover bg-center bg-no-repeat px-5 md:px-20 py-6" 
        style={{ backgroundImage: "url('/images/webp/section1.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
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
