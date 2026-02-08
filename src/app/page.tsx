export default function HomePage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <section className="h-screen snap-start snap-always flex items-center justify-center bg-gray-13">
        <span className="headline-06 text-gray-1">Section 1</span>
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
