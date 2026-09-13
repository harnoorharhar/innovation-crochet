"use client";

import { useState } from "react";

import ButtonProductOptions from "./ButtonProductOptions";
import PurchaseCard from "./PurchaseCard";

function ProductPurchaseSection({ product, averageRating, reviews }) {
  const variants = product.productVariants || [];

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  function handleVariantSelect(variantId) {
    setSelectedVariantId(variantId);
  }

  return (
    <>
      <section className="min-w-0">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">
          Innovation Crochet
        </p>

        <h1 className="text-4xl font-semibold leading-tight text-brand-dark sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium text-brand-dark">{averageRating}</span>

            <div className="flex text-brand-red">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= Math.round(Number(averageRating)) ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>

          <span className="text-sm text-brand-blue">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div className="my-5 h-px bg-brand-peach/50" />

        <div>
          <span className="text-3xl font-semibold text-brand-dark">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-brand-blue">
          FREE shipping on eligible orders
        </p>

        {variants.length > 0 && (
          <ButtonProductOptions
            variants={variants}
            selectedVariantId={selectedVariantId}
            onSelect={handleVariantSelect}
          />
        )}

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-brand-dark">
            About this item
          </h2>

          <p className="leading-7 text-gray-600">
            {product.description ||
              "Beautifully handcrafted crochet piece made with care, creativity, and a whole lot of yarn."}
          </p>
        </div>
      </section>

      <PurchaseCard
        product={product}
        selectedVariantId={selectedVariantId}
        selectedVariant={selectedVariant}
      />
    </>
  );
}

export default ProductPurchaseSection;
