import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

import Link from "next/link";
import LogoutButton from "../_Components/LogoutButton";

import { GiShoppingCart } from "react-icons/gi";
import { BiSolidPackage } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-brand-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl bg-brand-dark px-6 py-8 shadow-lg sm:px-8 sm:py-10">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-pink/20" />
          <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-brand-peach/20" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-peach text-xl font-bold text-brand-dark">
                {(profile?.full_name || "U").charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-medium text-brand-peach">
                  My Account
                </p>

                <p className="text-xs text-white/60">
                  Crochet customer account
                </p>
              </div>
            </div>

            <h1 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back, {profile?.full_name || "there"}!
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              Manage your profile, keep track of your orders, and revisit your
              favorite crochet pieces.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                Profile
              </p>

              <h2 className="mt-1 text-2xl font-bold text-brand-dark">
                Account Information
              </h2>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-brand-peach/30 sm:flex">
              <span className="text-lg text-brand-dark">♡</span>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-brand-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                Name
              </p>

              <p className="mt-2 wrap-break-words font-semibold text-brand-dark">
                {profile?.full_name || "Not provided"}
              </p>
            </div>

            <div className="rounded-2xl bg-brand-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                Email
              </p>

              <p className="mt-2 wrap-break-words font-semibold text-brand-dark">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl bg-brand-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                Member Since
              </p>

              <p className="mt-2 font-semibold text-brand-dark">
                {new Date(user.created_at).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Your Shopping
            </p>

            <h2 className="mt-1 text-2xl font-bold text-brand-dark">
              What would you like to do?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/cart"
              className="group relative overflow-hidden rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-blue hover:shadow-md"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-blue/5 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-xl text-brand-blue">
                    <GiShoppingCart />
                  </div>

                  <span className="text-2xl text-brand-blue transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-brand-dark">
                  Shopping Cart
                </h3>

                <p className="mt-2 text-sm leading-6 text-brand-navy/70">
                  View the crochet pieces you&apos;ve added to your cart.
                </p>
              </div>
            </Link>

            <Link
              href="/orders"
              className="group relative overflow-hidden rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-pink hover:shadow-md"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-pink/5 transition group-hover:scale-125" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink/10 text-xl text-brand-pink">
                    <BiSolidPackage />
                  </div>

                  <span className="text-2xl text-brand-pink transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-brand-dark">
                  My Orders
                </h3>

                <p className="mt-2 text-sm leading-6 text-brand-navy/70">
                  Check your previous orders and keep track of your purchases.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <Link
            href="/reviews"
            className="group flex flex-col gap-5 rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-peach hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-peach/30 text-2xl text-brand-dark">
                <FaStar />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Community
                </p>

                <h2 className="mt-1 text-xl font-bold text-brand-dark">
                  My Reviews
                </h2>

                <p className="mt-1 text-sm text-brand-navy/70">
                  View and edit the reviews you&apos;ve shared.
                </p>
              </div>
            </div>

            <span className="text-2xl text-brand-blue transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-brand-red/20 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Account
              </p>

              <h2 className="mt-1 text-xl font-bold text-brand-dark">
                Log out
              </h2>

              <p className="mt-1 text-sm text-brand-navy/70">
                Log out of your Crochet account on this device.
              </p>
            </div>

            <LogoutButton styles="rounded-xl border border-brand-red px-6 py-3 text-sm font-semibold text-brand-red transition hover:bg-brand-red hover:text-white" />
          </div>
        </section>

        <div className="mx-auto mt-10 flex items-center justify-center gap-2">
          <div className="h-1 w-8 rounded-full bg-brand-peach" />
          <div className="h-1 w-12 rounded-full bg-brand-pink" />
          <div className="h-1 w-8 rounded-full bg-brand-blue" />
        </div>
      </div>
    </main>
  );
}
