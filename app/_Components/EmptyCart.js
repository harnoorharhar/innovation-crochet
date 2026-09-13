import Link from "next/link";

function EmptyCart() {
  return (
    <main className="min-h-screen bg-brand-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-brand-dark">
          Shopping Cart
        </h1>

        <div className="rounded-2xl border border-brand-peach/40 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-peach/30 text-4xl">
            🧶
          </div>

          <h2 className="text-2xl font-semibold text-brand-dark">
            Your cart is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-brand-navy">
            You haven&apos;t added anything to your cart yet.
          </p>

          <Link
            href="/shop/products"
            className="mt-6 inline-flex rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default EmptyCart;
