import { notFound } from "next/navigation";

import { getProduct } from "@/app/lib/data-service";

import ProductGallery from "@/app/_Components/ProductGallery";
import ProductPurchaseSection from "@/app/_Components/ProductPurchaseSection";
import ReviewSlide from "@/app/_Components/ReviewSlide";

export default async function Page({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) notFound();

  const reviews = product.reviews || [];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const productImages = (product.productImages || []).map((image) => ({
    url: image.image_url,
    alt: image.alt_text || product.name,
  }));

  return (
    <main className="min-h-screen bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,1fr)_320px]">
          <ProductGallery
            images={productImages}
            productId={productId}
            productName={product.name}
          />

          <ProductPurchaseSection
            product={product}
            averageRating={averageRating}
            reviews={reviews}
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-brand-dark">
              Product details
            </h2>

            <div className="overflow-hidden rounded-xl border border-brand-peach/50 bg-white">
              <div className="grid grid-cols-2 border-b border-brand-peach/30 px-4 py-3">
                <span className="font-medium text-gray-700">Category</span>

                <span className="text-gray-600">
                  {product.category?.name || "Crochet"}
                </span>
              </div>

              <div className="grid grid-cols-2 border-b border-brand-peach/30 px-4 py-3">
                <span className="font-medium text-gray-700">Handmade</span>

                <span className="text-gray-600">Yes</span>
              </div>

              <div className="grid grid-cols-2 px-4 py-3">
                <span className="font-medium text-gray-700">Material</span>

                <span className="text-gray-600">
                  {product.material || "Premium yarn"}
                </span>
              </div>
            </div>
          </section>

          <section>
            <ReviewSlide
              reviews={reviews}
              productId={product.id}
              productSlug={product.slug}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
