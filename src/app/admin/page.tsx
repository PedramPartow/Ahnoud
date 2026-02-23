import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-13 p-10 lg:p-20">
      <h1 className="headline-03 text-gray-1 mb-10">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/admin/products" className="subtitle-03 text-gray-7 hover:text-gray-1 transition-colors">
          Products
        </Link>
      </nav>
    </div>
  );
}
