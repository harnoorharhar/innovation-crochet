"use client";

import { useRef, useState } from "react";
import AddReviewForm from "./AddReviewForm";
import { ImCross } from "react-icons/im";

export default function ReviewSlide({ reviews = [], productId, productSlug }) {
  const [addReview, setAddReview] = useState(false);
  const sliderRef = useRef(null);

  function scroll(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div
        className={`mb-4 flex items-center ${reviews.length === 1 ? "gap-30" : "gap-65"}`}
      >
        <h2 className="text-lg font-semibold text-brand-dark">
          Customer reviews
        </h2>

        <span className="text-sm text-brand-blue">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      {reviews.length > 0 ? (
        <>
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none"
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="w-full max-w-85 shrink-0 snap-start rounded-xl border border-brand-peach/50 bg-white p-5"
              >
                <div className="flex items-center gap-2">
                  <div className="text-brand-red">
                    {"★".repeat(Math.round(review.rating || 0))}
                    {"☆".repeat(5 - Math.round(review.rating || 0))}
                  </div>

                  <span className="text-sm font-medium text-brand-dark">
                    {Number(review.rating || 0).toFixed(1)}
                  </span>
                </div>

                <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">
                  {review.comment || "No comment provided."}
                </p>

                {review.user_id?.full_name && (
                  <p className="mt-4 text-xs font-semibold text-brand-blue">
                    {review.user.full_name}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div
            className={`mt-4 flex items-center ${
              addReview ? "justify-end" : "justify-between"
            }`}
          >
            {addReview === false ? (
              <form>
                <button
                  type="button"
                  onClick={() => setAddReview((isOn) => !isOn)}
                  className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Add review
                </button>
              </form>
            ) : (
              ""
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-peach/60 bg-white text-lg text-brand-dark transition hover:bg-brand-peach/20"
                aria-label="Previous reviews"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scroll("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-peach/60 bg-white text-lg text-brand-dark transition hover:bg-brand-peach/20"
                aria-label="Next reviews"
              >
                →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-brand-peach/50 bg-white p-6">
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
          <button
            type="button"
            onClick={() => setAddReview((isOn) => !isOn)}
            className="mt-4 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Add review
          </button>
        </div>
      )}
      {addReview === true ? (
        <div className="relative mt-6 rounded-2xl border border-brand-peach/40 bg-brand-cream/40 p-5 shadow-sm">
          <button
            type="button"
            onClick={() => setAddReview(false)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-brand-dark transition hover:bg-brand-peach/30 hover:text-brand-red"
            aria-label="Close review form"
          >
            <ImCross className="text-xs" />
          </button>

          <div className="pr-10">
            <AddReviewForm
              productId={productId}
              onSuccess={() => setAddReview(false)}
              productSlug={productSlug}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
