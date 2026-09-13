import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-semibold text-brand-dark">
        Product not found
      </h1>

      <p className="text-gray-600">
        We couldn&apos;t find the product you&apos;re looking for.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-brand-blue px-6 py-3 text-lg font-semibold text-white transition hover:bg-brand-navy"
      >
        Go back home
      </Link>
    </main>
  );
}
