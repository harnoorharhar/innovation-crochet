import { redirect } from "next/navigation";
import Link from "next/link";

import { getOrders } from "../lib/data-service";

export default async function OrdersPage() {
  const { user, orders } = await getOrders();

  if (!user) {
    redirect("/login?redirect=/orders");
  }

  return (
    <main className="min-h-screen bg-brand-cream px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            My account
          </p>

          <h1 className="font-poppins text-4xl font-bold text-brand-dark">
            My orders
          </h1>

          <p className="mt-3 text-brand-dark/60">
            View your past orders and check their delivery status.
          </p>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-peach/30 text-3xl">
              🧶
            </div>

            <h2 className="mt-5 font-poppins text-2xl font-bold text-brand-dark">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-brand-dark/60">
              Your orders will appear here once you place your first order.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white transition hover:bg-brand-navy"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-brand-dark/50">
                      Order #{order.id.slice(0, 8)}
                    </p>

                    <h2 className="mt-1 font-poppins text-xl font-bold text-brand-dark">
                      {order.orderItems?.length || 0}{" "}
                      {order.orderItems?.length === 1 ? "item" : "items"}
                    </h2>

                    <p className="mt-1 text-sm text-brand-dark/50">
                      {new Date(order.created_at).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-brand-peach/30 px-4 py-2 text-sm font-bold capitalize text-brand-dark">
                      {order.status}
                    </span>

                    <span className="font-poppins text-xl font-bold text-brand-blue">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
