import Link from "next/link";
import { getProductsBySlugs } from "../lib/data-service";

const productSlugs = [
  "crochet-jumbo-turtle",
  "crochet-star-purse",
  "crochet-cherry-keychain",
  "crochet-jumbo-chick",
];

export default async function ShopProductCard() {
  const products = await getProductsBySlugs(productSlugs);

  if (products.length === 0) {
    return (
      <div className="rounded-4xl border border-brand-peach/30 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-peach/30">
          <span className="text-4xl">🧶</span>
        </div>

        <h3 className="mt-6 font-poppins text-2xl font-bold text-brand-dark">
          No products found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-brand-navy/60">
          We don&apos;t have any products available right now. Check back soon
          for new handmade creations.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const image = product.productImages?.[0]?.image_url;
          const category = product.categories?.name || "Crochet";

          return (
            <Link
              key={product.id}
              href={`/shop/products/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-brand-dark/5 transition duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {image ? (
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-peach/20">
                    <span className="text-7xl">🧶</span>
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-brand-cream/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-sm backdrop-blur">
                  {category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-3 rounded-xl bg-brand-dark px-4 py-3 text-center font-semibold text-brand-cream opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Product →
                </div>
              </div>

              <div className="px-1 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-poppins text-lg font-bold text-brand-dark transition-colors duration-200 group-hover:text-brand-navy">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-brand-navy/60">
                      Handmade crochet
                    </p>
                  </div>

                  <span className="whitespace-nowrap rounded-full bg-brand-peach/30 px-3 py-1.5 text-sm font-bold text-brand-red">
                    ${product.price}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/shop/products"
          className="inline-flex items-center rounded-full bg-brand-dark px-7 py-3.5 font-semibold text-brand-cream transition duration-300 hover:bg-brand-navy"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
}
