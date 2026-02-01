import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-13 text-gray-1 px-4">
      <p className="text-6xl font-semibold text-primary-5 mb-2">404</p>
      <h1 className="text-xl font-medium mb-2">Page not found</h1>
      <p className="text-gray-4 text-center mb-8 max-w-sm">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn button-01 inline-block bg-primary-7 text-gray-13 hover:bg-primary-6 no-underline"
      >
        Back to home
      </Link>
    </div>
  );
}
