import Button from "@/components/general/Button";
import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-13 p-10 lg:p-20 flex flex-col">
      <div>
        <h1 className="headline-03 text-gray-1 mb-10">Admin Panel</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/admin/products" className="subtitle-03 text-gray-7 hover:text-gray-1 transition-colors">
            Products
          </Link>
          <Link href="/admin/orders" className="subtitle-03 text-gray-7 hover:text-gray-1 transition-colors">
            Orders
          </Link>
          <Link href="/admin/users" className="subtitle-03 text-gray-7 hover:text-gray-1 transition-colors">
            Users
          </Link>
          <Link href="/admin/contact-forms" className="subtitle-03 text-gray-7 hover:text-gray-1 transition-colors">
            Contact forms
          </Link>
        </nav>
      </div>
      <Button className="sm-md outline-gray block mt-auto" href="/">
        Back to home
      </Button>
    </div>
  );
}