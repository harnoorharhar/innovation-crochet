import Link from "next/link";

function OrderSummary({ validCartItems }) {
  const totalQuantity = validCartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const subtotal = validCartItems.reduce((sum, item) => {
    const product = item.products;

    if (!product) {
      return sum;
    }

    const price = item.productVariants?.price
      ? Number(item.productVariants.price)
      : Number(product.price);

    return sum + price * Number(item.quantity);
  }, 0);

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-2xl border border-brand-peach/40 bg-white p-6 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-xl font-semibold text-brand-dark">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-brand-navy">Subtotal</span>

          <span className="font-medium text-brand-dark">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-brand-navy">Shipping</span>

          <span className="font-medium text-brand-dark">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {subtotal > 0 && subtotal < 50 && (
          <div className="rounded-lg bg-brand-peach/25 px-3 py-2 text-xs leading-5 text-brand-navy">
            Add ${(50 - subtotal).toFixed(2)} more to get free shipping.
          </div>
        )}
      </div>

      <div className="my-6 border-t border-brand-peach/30" />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-brand-dark">Total</span>

        <span className="text-2xl font-bold text-brand-dark">
          ${total.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-xl bg-brand-navy px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Proceed to Checkout
      </Link>

      <Link
        href="/shop/products"
        className="mt-4 block text-center text-sm font-medium text-brand-blue hover:underline"
      >
        Continue Shopping
      </Link>

      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brand-pink" />
    </aside>
  );
}

export default OrderSummary;
