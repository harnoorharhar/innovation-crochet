import Link from "next/link";
import ShopProductCard from "../_Components/ShopProductCard";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden bg-brand-dark px-6 py-20 md:py-28">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-peach/30 bg-brand-cream/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-brand-peach" />

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-peach">
                Handmade with love
              </span>
            </div>

            <h1 className="font-poppins text-5xl font-bold leading-[1.05] text-brand-cream sm:text-6xl md:text-7xl">
              Little things,
              <span className="block text-brand-pink">made with care.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-brand-cream/70">
              Discover handmade crochet creations designed to bring a little
              more color, comfort, and personality into your everyday life.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/shop/products"
                className="rounded-full bg-brand-peach px-7 py-3.5 font-semibold text-brand-dark shadow-lg shadow-brand-peach/10 transition duration-300 hover:-translate-y-1 hover:bg-brand-pink"
              >
                Shop All Products
              </Link>

              <Link
                href="#featured"
                className="rounded-full border border-brand-cream/30 px-7 py-3.5 font-semibold text-brand-cream transition duration-300 hover:border-brand-peach hover:bg-brand-cream/10"
              >
                Explore Featured
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-md rounded-[3rem] bg-brand-cream p-5 shadow-2xl">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] bg-brand-peach/30">
                <div className="text-center">
                  <div className="text-8xl">🧶</div>

                  <p className="mt-5 font-poppins text-xl font-bold text-brand-dark">
                    Handmade
                  </p>

                  <p className="mt-1 text-sm text-brand-navy">
                    One stitch at a time
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-brand-pink px-5 py-4 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                  Made for you
                </p>

                <p className="mt-1 font-poppins text-lg font-bold text-brand-dark">
                  ♡ Handmade
                </p>
              </div>

              <div className="absolute -right-5 -top-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-peach shadow-xl">
                <span className="text-3xl">✿</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-px left-0 h-12 w-full rounded-t-[50%] bg-brand-cream" />
      </section>

      <section id="featured" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-1 w-10 rounded-full bg-brand-pink" />

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
                  Featured collection
                </p>
              </div>

              <h2 className="font-poppins text-4xl font-bold text-brand-dark md:text-5xl">
                Made to make you smile.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-brand-navy/70">
                Welcome to Innovation Crochet, a small handmade business created
                by Anhad, a 10-year-old crochet artist who started learning from
                YouTube two years ago. What began as a hobby has grown into a
                collection of cute, colorful creations made with patience and
                love.
              </p>
            </div>

            <Link
              href="/shop/products"
              className="hidden shrink-0 rounded-full border-2 border-brand-dark px-6 py-3 font-semibold text-brand-dark transition duration-300 hover:bg-brand-dark hover:text-brand-cream md:inline-block"
            >
              View All →
            </Link>
          </div>

          <ShopProductCard />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-4xl bg-brand-navy px-7 py-10 md:px-12 md:py-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/30" />
            <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-brand-pink/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-peach">
                  Your next favorite might be here
                </p>

                <h3 className="mt-2 font-poppins text-2xl font-bold text-brand-cream md:text-3xl">
                  Find something uniquely yours.
                </h3>
              </div>

              <Link
                href="/shop/products"
                className="rounded-full bg-brand-cream px-6 py-3 font-semibold text-brand-dark transition duration-300 hover:-translate-y-1 hover:bg-brand-peach"
              >
                Browse the Shop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
