"use client";

import { addToCart } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({
  availableStock,
  hasVariants,
  quantity,
  selectedVariantId,
  product,
  className = "",
}) {
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    if (hasVariants && !selectedVariantId) {
      alert(
        "Please select a size or color before adding this item to your cart.",
      );
      return;
    }

    if (availableStock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    if (quantity > availableStock) {
      alert(`Only ${availableStock} available.`);
      return;
    }

    startTransition(async () => {
      await addToCart(product.id, selectedVariantId, quantity);
      toast.success("Item added to cart!", {
        position: "top-right",
      });
    });
  }

  const disabled =
    isPending || availableStock <= 0 || (hasVariants && !selectedVariantId);

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
        className={className}
      >
        {isPending
          ? "Adding..."
          : availableStock <= 0
            ? "Out of Stock"
            : hasVariants && !selectedVariantId
              ? "Select an Option"
              : "Add to cart"}
      </button>
    </div>
  );
}
