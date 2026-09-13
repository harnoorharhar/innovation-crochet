import { getCart } from "../lib/data-service";
import { createClient } from "../lib/supabase/server";
import { clearCart } from "../lib/actions";

import EmptyCart from "@/app/_Components/EmptyCart";
import Button from "../_Components/Button";
import CartItems from "../_Components/CartItems";
import OrderSummary from "../_Components/OrderSummary";

export default async function Page() {
  const supabase = await createClient();
  const cartItems = await getCart();

  const validCartItems = cartItems.filter((item) => item.products);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <EmptyCart />;
  if (!cartItems || cartItems.length === 0) return <EmptyCart />;
  if (validCartItems.length === 0) return <EmptyCart />;

  return (
    <main className="min-h-screen bg-brand-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-brand-navy">
            {validCartItems.length}{" "}
            {validCartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <CartItems validCartItems={validCartItems} />
          <OrderSummary validCartItems={validCartItems} />
          <form action={clearCart}>
            <Button className=" block w-30 rounded-xl bg-brand-pink px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-brand-dark">
              Clear Cart
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
