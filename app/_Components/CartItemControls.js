"use client";

import { useState, useTransition } from "react";
import { updateCartItemQuantity, removeCartItem } from "@/app/lib/actions";

function CartItemControls({ cartItemId, quantity, stock }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const currentQuantity = Number(quantity);
  const availableStock = Number(stock);

  function updateQuantity(newQuantity) {
    setError("");

    if (newQuantity < 1) {
      return;
    }

    if (Number.isFinite(availableStock) && newQuantity > availableStock) {
      setError(`Only ${availableStock} available.`);
      return;
    }

    startTransition(async () => {
      try {
        await updateCartItemQuantity(cartItemId, newQuantity);
      } catch (error) {
        setError(error?.message || "Could not update quantity.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center overflow-hidden rounded-lg border border-brand-blue/40">
            <button
              type="button"
              onClick={() => updateQuantity(currentQuantity - 1)}
              disabled={isPending || currentQuantity <= 1}
              aria-label="Decrease quantity"
              className="px-3 py-1.5 text-lg text-brand-navy transition hover:bg-brand-blue/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-10 border-x border-brand-blue/20 px-3 py-1.5 text-center text-sm font-medium text-brand-dark">
              {currentQuantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(currentQuantity + 1)}
              disabled={isPending || currentQuantity >= availableStock}
              aria-label="Increase quantity"
              className="px-3 py-1.5 text-lg text-brand-navy transition hover:bg-brand-blue/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          {availableStock > 0 && (
            <p className="mt-1 text-xs p-2 text-gray-500">
              {availableStock} available
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default CartItemControls;
