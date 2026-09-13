import { redirect } from "next/navigation";
import { getCheckoutData } from "../lib/data-service";
import CheckoutForm from "../_Components/CheckoutForm";

export default async function CheckoutPage() {
  const { user, cartItems, subtotal, shipping, total } =
    await getCheckoutData();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  if (!cartItems || cartItems.length === 0) {
    redirect("/cart");
  }

  return (
    <main className="min-h-screen bg-brand-cream px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Checkout
          </p>

          <h1 className="font-poppins text-4xl font-bold text-brand-dark">
            Complete your order
          </h1>

          <p className="mt-3 max-w-2xl text-brand-dark/70">
            Enter your delivery information below. Payment will be collected
            when your order is delivered.
          </p>
        </div>

        <CheckoutForm
          user={user}
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />
      </div>
    </main>
  );
}
