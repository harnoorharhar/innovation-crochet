import { getProducts } from "@/app/lib/data-service";

import ProductCategories from "@/app/_Components/ProductCategories";
import ProductCard from "@/app/_Components/ProductCard";
import ProductSidebar from "@/app/_Components/ProductSidebar";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  const category = params.category || "all";
  const price = params.price;
  const rating = params.rating;
  const stock = params.stock;

  const products = await getProducts();

  const formattedProducts =
    products
      ?.map((product) => {
        const reviews = product.reviews || [];

        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0;

        const images = [...(product.productImages || [])].sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
        );

        return {
          ...product,
          category: product.categories?.name || "Uncategorized",
          categorySlug: product.categories?.slug || "",
          image: images[0]?.image_url || "/products/placeholder.jpg",
          imageAlt: images[0]?.alt_text || product.name,
          rating: averageRating,
          reviewCount: reviews.length,
        };
      })
      .filter((product) => {
        if (category !== "all" && product.categorySlug !== category) {
          return false;
        }

        if (price === "under-20" && product.price >= 20) {
          return false;
        }

        if (price === "20-40" && (product.price < 20 || product.price > 40)) {
          return false;
        }

        if (price === "40-plus" && product.price < 40) {
          return false;
        }

        if (rating && product.rating < Number(rating)) {
          return false;
        }

        if (stock === "in-stock" && product.stock <= 0) {
          return false;
        }

        return true;
      }) || [];

  return (
    <main className="min-h-screen bg-brand-cream text-brand-dark">
      <section className="px-6 pb-20 pt-12 sm:px-10 lg:px-16 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-poppins text-4xl font-bold tracking-tight sm:text-5xl">
                  Shop
                </h1>
              </div>

              <p className="text-sm font-medium text-slate-500">
                {formattedProducts.length} products
              </p>
            </div>
          </div>

          <ProductCategories />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
            <ProductSidebar />

            <div>
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-brand-dark/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-slate-500">
                    Showing {formattedProducts.length} products
                  </p>

                  <h2 className="mt-1 font-poppins text-2xl font-bold">
                    Explore the collection
                  </h2>
                </div>

                <select
                  defaultValue="featured"
                  className="rounded-lg border border-brand-dark/15 bg-white px-4 py-3 text-sm font-medium text-brand-dark outline-none transition focus:border-brand-blue"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {formattedProducts.length === 0 ? (
                <div className="rounded-2xl border border-brand-dark/10 bg-white p-12 text-center">
                  <h3 className="font-poppins text-xl font-bold">
                    No products found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try changing or clearing your filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                  {formattedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
