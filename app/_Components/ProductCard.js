"use client";

import Link from "next/link";

import GetStars from "./GetStars";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  const hasVariants = false;
  const quantity = 1;
  const selectedVariantId = null;

  return (
    <article className="group">
      <Link href={`/shop/products/${product.slug}`}>
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#FDE8D8]">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label={`Add ${product.name} to favourites`}
            onClick={(e) => e.preventDefault()}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-brand-dark shadow-md transition hover:scale-105 hover:bg-brand-dark hover:text-white"
          >
            ♡
          </button>

          {product.stock === 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-brand-dark px-3 py-1.5 text-xs font-bold text-white">
              Sold out
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              {product.category}
            </p>

            <h3 className="font-poppins text-lg font-bold">{product.name}</h3>
          </div>

          <p className="shrink-0 text-lg font-bold">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex text-sm tracking-wide text-brand-red">
            {GetStars(product.rating)}
          </div>

          <span className="text-xs text-slate-500">
            {product.reviewCount > 0
              ? `(${product.reviewCount})`
              : "No reviews"}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>
      </Link>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link
          href={`/shop/products/${product.slug}`}
          className="flex items-center justify-center rounded-lg border border-brand-dark px-3 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-dark hover:text-white"
        >
          View Product
        </Link>

        <AddToCartButton
          availableStock={Number(product.stock)}
          hasVariants={hasVariants}
          quantity={quantity}
          product={product}
          selectedVariantId={selectedVariantId}
          className="w-full rounded-lg bg-brand-dark px-3 py-3 text-sm font-bold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </article>
  );
}

export default ProductCard;
