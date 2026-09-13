"use client";

import { useState, useTransition } from "react";
import AddToCartButton from "./AddToCartButton";

function PurchaseCard({ product, selectedVariantId, selectedVariant }) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const variants = product.productVariants || [];
  const hasVariants = variants.length > 0;

  const availableStock = selectedVariant
    ? Number(selectedVariant.stock)
    : Number(product.stock);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(5, availableStock, current + 1));
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <div className="rounded-2xl border border-brand-peach/60 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-1">
          <span className="text-sm text-gray-500">$</span>

          <span className="text-3xl font-semibold text-brand-dark">
            {Number(product.price).toFixed(2)}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          <span className="font-medium text-brand-blue">FREE shipping</span>
          <br />
          Delivery available across Canada
        </p>

        <div className="mt-5">
          {availableStock > 0 ? (
            <p className="font-semibold text-green-600">
              In Stock
              {selectedVariant && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({availableStock} available)
                </span>
              )}
            </p>
          ) : (
            <p className="font-semibold text-brand-red">
              Currently unavailable
            </p>
          )}
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">Quantity</p>

          <div className="flex w-fit items-center overflow-hidden rounded-lg border border-brand-blue/40">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1 || isPending || availableStock <= 0}
              aria-label="Decrease quantity"
              className="px-4 py-2 text-lg text-brand-navy transition hover:bg-brand-blue/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-12 border-x border-brand-blue/20 px-3 py-2 text-center text-sm font-semibold text-brand-dark">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={
                quantity >= Math.min(5, availableStock) ||
                isPending ||
                availableStock <= 0
              }
              aria-label="Increase quantity"
              className="px-4 py-2 text-lg text-brand-navy transition hover:bg-brand-blue/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">Maximum 5 per order</p>
        </div>

        {hasVariants && selectedVariant && (
          <div className="mt-4 rounded-lg bg-brand-cream px-3 py-2 text-sm text-brand-navy">
            {selectedVariant.size && (
              <p>
                <span className="font-medium">Size:</span>{" "}
                {selectedVariant.size}
              </p>
            )}

            {selectedVariant.color && (
              <p>
                <span className="font-medium">Color:</span>{" "}
                {selectedVariant.color}
              </p>
            )}
          </div>
        )}

        {hasVariants && !selectedVariantId && (
          <p className="mt-4 rounded-lg bg-brand-peach/20 px-3 py-2 text-xs leading-5 text-brand-navy">
            Select your size or color before adding this item to your cart.
          </p>
        )}

        <AddToCartButton
          availableStock={availableStock}
          hasVariants={hasVariants}
          quantity={quantity}
          product={product}
          selectedVariantId={selectedVariantId}
          className="mt-5 w-full rounded-2xl bg-brand-blue px-5 py-3 font-semibold text-brand-cream transition hover:bg-brand-navy hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="mt-6 space-y-3 border-t border-brand-peach/40 pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Sold by</span>

            <span className="font-medium text-brand-blue">
              Innovation Crochet
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Returns</span>

            <span className="text-right text-gray-600">
              Eligible for return
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Packaging</span>

            <span className="text-right text-gray-600">Carefully packaged</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PurchaseCard;
