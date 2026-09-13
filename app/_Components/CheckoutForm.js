"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createOrder } from "../lib/actions";

export default function CheckoutForm({
  user,
  cartItems,
  subtotal,
  shipping,
  total,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    province: "Ontario",
    postalCode: "",
    country: "Canada",
    deliveryInstructions: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const result = await createOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
        deliveryInstructions: formData.deliveryInstructions,
      });

      if (!result.success) {
        setError(result.error || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/orders/${result.orderId}`);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setError(
        error?.message || "Something went wrong while placing your order.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_400px]"
    >
      <div className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
          <h2 className="font-poppins text-2xl font-bold text-brand-dark">
            Delivery information
          </h2>

          <p className="mt-1 text-sm text-brand-dark/60">
            Tell us where to deliver your order.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Full name *
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Email
              </label>

              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full rounded-xl border border-brand-dark/10 bg-gray-100 px-4 py-3 text-brand-dark/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Phone number *
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                placeholder="(416) 123-4567"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-dark">
                Address *
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Street address"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Brampton"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  Province *
                </label>

                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                >
                  <option>Ontario</option>
                  <option>Alberta</option>
                  <option>British Columbia</option>
                  <option>Manitoba</option>
                  <option>New Brunswick</option>
                  <option>Newfoundland and Labrador</option>
                  <option>Nova Scotia</option>
                  <option>Prince Edward Island</option>
                  <option>Quebec</option>
                  <option>Saskatchewan</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  Postal code *
                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 uppercase outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="L6A 1A1"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-dark">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5">
          <h2 className="font-poppins text-2xl font-bold text-brand-dark">
            Delivery instructions
          </h2>

          <p className="mt-1 text-sm text-brand-dark/60">
            Optional instructions for your delivery.
          </p>

          <textarea
            name="deliveryInstructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            rows={4}
            className="mt-5 w-full resize-none rounded-xl border border-brand-dark/10 bg-brand-cream px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Example: Please leave the order at the front door."
          />
        </section>
      </div>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-dark/5 lg:sticky lg:top-24">
        <h2 className="font-poppins text-2xl font-bold text-brand-dark">
          Your order
        </h2>

        <div className="mt-6 space-y-4">
          {cartItems.map((item) => {
            const product = item.products;
            const variant = item.productVariants;

            const price = variant
              ? Number(variant.price)
              : Number(product?.price || 0);

            return (
              <div key={item.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-semibold text-brand-dark">
                    {product?.name || "Product"}
                  </p>

                  {variant && (
                    <p className="text-sm text-brand-blue">Variant selected</p>
                  )}

                  <p className="text-sm text-brand-dark/60">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-brand-dark">
                  ${(price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="my-6 h-px bg-brand-dark/10" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-brand-dark/60">Subtotal</span>

            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-brand-dark/60">Delivery</span>

            <span className="font-semibold">
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
        </div>

        <div className="my-6 h-px bg-brand-dark/10" />

        <div className="flex justify-between">
          <span className="font-poppins text-lg font-bold text-brand-dark">
            Total
          </span>

          <span className="font-poppins text-2xl font-bold text-brand-blue">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-4">
          <p className="font-bold text-brand-dark">Payment</p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-blue">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-blue" />
            </div>

            <div>
              <p className="font-semibold text-brand-dark">Pay on delivery</p>

              <p className="text-xs text-brand-dark/60">
                Payment is collected when your order arrives.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-brand-blue px-5 py-4 font-poppins font-bold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Placing order..." : "Place order"}
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-brand-dark/50">
          By placing your order, you confirm that your delivery information is
          correct and agree to pay when your order is delivered.
        </p>
      </aside>
    </form>
  );
}
