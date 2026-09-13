import Link from "next/link";
import CartItemControls from "./CartItemControls";
import Image from "next/image";
import { removeCartItem } from "../lib/actions";

function CartItems({ validCartItems }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-brand-peach/40 bg-white shadow-sm">
      <div className="border-b border-brand-peach/30 px-6 py-5">
        <h2 className="text-lg font-semibold text-brand-dark">Your Items</h2>
      </div>

      <div className="divide-y divide-brand-peach/30">
        {validCartItems.map((item) => {
          const product = item.products;
          const variant = item.productVariants;

          if (!product) return null;

          const image = product.productImages?.[0]?.image_url ?? null;

          const price = Number(product.price);
          const itemTotal = price * Number(item.quantity);
          console.log(validCartItems.id);
          return (
            <div key={item.id} className="flex gap-4 p-6 sm:gap-6">
              <Link
                href={`shop/products/${product.slug}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-brand-peach/20 sm:h-36 sm:w-36"
              >
                {image ? (
                  <Image
                    src={image}
                    alt={product.productImages?.[0]?.alt_text || product.name}
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">
                    🧶
                  </div>
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-base font-semibold text-brand-dark transition hover:text-brand-blue"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-2 space-y-1 text-sm text-brand-navy">
                      {variant?.size && (
                        <p>
                          <span className="font-medium">Size:</span>{" "}
                          {variant.size}
                        </p>
                      )}

                      {variant?.color && (
                        <p>
                          <span className="font-medium">Color:</span>{" "}
                          {variant.color}
                        </p>
                      )}

                      <p>
                        <span className="font-medium">Price:</span> $
                        {price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg font-bold text-brand-dark">
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <div className="flex items-center overflow-hidden rounded-lg border border-brand-blue/40">
                    <CartItemControls
                      cartItemId={item.id}
                      quantity={item.quantity}
                      stock={item.productVariants?.stock ?? product.stock}
                    />
                  </div>
                  <form action={removeCartItem}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <button
                      className="text-sm font-medium text-brand-red transition hover:text-red-800"
                      type="submit"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CartItems;
