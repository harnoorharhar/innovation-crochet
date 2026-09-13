import Link from "next/link";
import { redirect } from "next/navigation";

import { editReviews } from "../lib/actions";
import ReviewCard from "../_Components/ReviewCard";

export default async function ReviewsPage() {
  const result = await editReviews();

  if (!result.success && result.error === "You must be logged in.") {
    redirect("/login?redirect=/reviews");
  }

  const reviews = result.reviews || [];

  return (
    <main className="min-h-screen bg-brand-cream px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/account"
          className="mb-6 inline-flex items-center gap-2 font-inter text-sm font-medium text-brand-navy transition-colors hover:text-brand-pink"
        >
          ← Back to Account
        </Link>

        <div className="mb-10">
          <p className="mb-2 font-inter text-sm font-semibold uppercase tracking-[0.2em] text-brand-pink">
            Your Voice
          </p>

          <h1 className="font-poppins text-4xl font-bold text-brand-dark sm:text-5xl">
            My Reviews
          </h1>

          <p className="mt-3 max-w-2xl font-inter leading-7 text-brand-navy/70">
            Manage the reviews you&apos;ve shared about your favourite crochet
            products.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="rounded-3xl border border-brand-peach/60 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/10 text-3xl text-brand-pink">
              ★
            </div>

            <h2 className="font-poppins text-2xl font-bold text-brand-dark">
              No reviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-md font-inter text-brand-navy/65">
              Reviews you leave on products will appear here.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-brand-navy px-6 py-3 font-poppins text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-blue"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
