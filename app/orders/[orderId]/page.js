import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getOrder } from "../../lib/data-service";

export default async function OrderPage({ params }) {
  const { orderId } = await params;
  const { user, order, orderItems } = await getOrder(orderId);

  if (!user) {
    redirect(`/login?redirect=/orders/${orderId}`);
  }

  if (!order) {
    notFound();
  }

  const subtotal = (orderItems || []).reduce((sum, item) => {
    return sum + Number(item.subtotal || 0);
  }, 0);

  const shipping = Number(order.total) - subtotal;

  const orderDate = new Date(order.created_at);

  const formattedDate = orderDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-brand-cream px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <section className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10">
            <svg
              className="h-8 w-8 text-brand-blue"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Order confirmed
          </p>

          <h1 className="mt-2 font-poppins text-4xl font-bold text-brand-dark">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-brand-dark/60">
            Your order has been successfully placed. We will contact you if we
            need any additional information.
          </p>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-dark/5">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark/50">
            Order number
          </p>

          <p className="mt-2 break-all font-mono text-lg font-bold text-brand-blue">
            {order.id}
          </p>

          <p className="mt-2 text-sm text-brand-dark/50">
            Placed on {formattedDate}
          </p>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
              <h2 className="font-poppins text-2xl font-bold text-brand-dark">
                Your order
              </h2>

              <div className="mt-6 divide-y divide-brand-dark/10">
                {orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-5 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-dark">
                        {item.product_name}
                      </p>

                      {item.product_variant_id && (
                        <p className="mt-1 text-sm text-brand-blue">
                          Variant selected
                        </p>
                      )}

                      <p className="mt-1 text-sm text-brand-dark/50">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm text-brand-dark/50">
                        ${Number(item.price).toFixed(2)} each
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold text-brand-dark">
                      ${Number(item.subtotal).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
              <h2 className="font-poppins text-2xl font-bold text-brand-dark">
                Delivery information
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark/40">
                    Name
                  </p>

                  <p className="mt-1 font-medium text-brand-dark">
                    {order.shipping_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark/40">
                    Phone
                  </p>

                  <p className="mt-1 font-medium text-brand-dark">
                    {order.shipping_phone || "Not provided"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark/40">
                    Address
                  </p>

                  <p className="mt-1 font-medium text-brand-dark">
                    {order.shipping_address}
                  </p>

                  <p className="text-sm text-brand-dark/60">
                    {order.shipping_city}, {order.shipping_province}{" "}
                    {order.shipping_postal_code}
                  </p>

                  <p className="text-sm text-brand-dark/60">
                    {order.shipping_country}
                  </p>
                </div>

                {order.delivery_instructions && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark/40">
                      Delivery instructions
                    </p>

                    <p className="mt-1 text-sm text-brand-dark/70">
                      {order.delivery_instructions}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
              <h2 className="font-poppins text-2xl font-bold text-brand-dark">
                Order summary
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-dark/60">Subtotal</span>

                  <span className="font-semibold text-brand-dark">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-brand-dark/60">Delivery</span>

                  <span className="font-semibold text-brand-dark">
                    {shipping <= 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="my-6 h-px bg-brand-dark/10" />

              <div className="flex justify-between">
                <span className="font-poppins text-lg font-bold text-brand-dark">
                  Total
                </span>

                <span className="font-poppins text-2xl font-bold text-brand-blue">
                  ${Number(order.total).toFixed(2)}
                </span>
              </div>
            </section>

            <section className="rounded-3xl border border-brand-blue/20 bg-brand-blue/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
                Payment
              </p>

              <h3 className="mt-2 font-poppins text-lg font-bold text-brand-dark">
                Pay on delivery
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
                Payment will be collected when your order is delivered.
              </p>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark/40">
                Order status
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-brand-blue" />

                <span className="font-semibold capitalize text-brand-dark">
                  {order.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-brand-dark/50">
                We&apos;ll update your order status as it moves through the
                delivery process.
              </p>
            </section>
          </aside>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/orders"
            className="rounded-xl border border-brand-dark/10 bg-white px-6 py-3 text-center font-semibold text-brand-dark transition hover:border-brand-blue hover:text-brand-blue"
          >
            View my orders
          </Link>

          <Link
            href="/shop"
            className="rounded-xl bg-brand-blue px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-navy"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
