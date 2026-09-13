"use client";

function ButtonProductOptions({ variants = [], selectedVariantId, onSelect }) {
  if (!variants.length) {
    return null;
  }

  /*
   * Get unique sizes.
   */
  const sizes = [
    ...new Map(
      variants
        .filter((variant) => variant.size)
        .map((variant) => [variant.size, variant]),
    ).values(),
  ];

  /*
   * Get unique colors.
   */
  const colors = [
    ...new Map(
      variants
        .filter((variant) => variant.color)
        .map((variant) => [variant.color, variant]),
    ).values(),
  ];

  /*
   * Find currently selected variant.
   */
  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  /*
   * If the product has both size and color,
   * find all combinations.
   */
  const hasSizes = sizes.length > 0;
  const hasColors = colors.length > 0;

  return (
    <div className="mt-6 space-y-5">
      {/* SIZE */}
      {hasSizes && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-dark">Size</p>

            {selectedVariant?.size && (
              <span className="text-sm text-gray-500">
                Selected: {selectedVariant.size}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((sizeItem) => {
              const size = sizeItem.size;

              const matchingVariant = variants.find(
                (variant) =>
                  variant.size === size &&
                  (!selectedVariant?.color ||
                    variant.color === selectedVariant.color),
              );

              const isSelected = selectedVariant?.size === size;

              const isOutOfStock =
                !matchingVariant || Number(matchingVariant.stock) <= 0;

              return (
                <button
                  key={size}
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => {
                    if (matchingVariant) {
                      onSelect(matchingVariant.id);
                    }
                  }}
                  className={`
                    min-w-16 rounded-lg border px-4 py-2.5
                    text-sm font-semibold transition

                    ${
                      isSelected
                        ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                        : "border-gray-300 bg-white text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5"
                    }

                    ${
                      isOutOfStock
                        ? "cursor-not-allowed opacity-40 line-through"
                        : ""
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* COLOR */}
      {hasColors && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-brand-dark">Color</p>

            {selectedVariant?.color && (
              <span className="text-sm text-gray-500">
                Selected: {selectedVariant.color}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {colors.map((colorItem) => {
              const color = colorItem.color;

              const matchingVariant = variants.find(
                (variant) =>
                  variant.color === color &&
                  (!selectedVariant?.size ||
                    variant.size === selectedVariant.size),
              );

              const isSelected = selectedVariant?.color === color;

              const isOutOfStock =
                !matchingVariant || Number(matchingVariant.stock) <= 0;

              return (
                <button
                  key={color}
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => {
                    if (matchingVariant) {
                      onSelect(matchingVariant.id);
                    }
                  }}
                  className={`
                    rounded-lg border px-4 py-2.5
                    text-sm font-semibold transition

                    ${
                      isSelected
                        ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                        : "border-gray-300 bg-white text-brand-dark hover:border-brand-blue hover:bg-brand-blue/5"
                    }

                    ${
                      isOutOfStock
                        ? "cursor-not-allowed opacity-40 line-through"
                        : ""
                    }
                  `}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Warning */}
      {!selectedVariantId && (
        <p className="rounded-lg bg-brand-peach/20 px-3 py-2 text-xs text-brand-navy">
          Please select your options before adding this item to your cart.
        </p>
      )}

      {/* Selected Variant Stock */}
      {selectedVariant && (
        <div className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
          {Number(selectedVariant.stock) > 0
            ? `${selectedVariant.stock} available`
            : "This option is currently out of stock."}
        </div>
      )}
    </div>
  );
}

export default ButtonProductOptions;
