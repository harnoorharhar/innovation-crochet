"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { updateReviewAction, deleteReviewAction } from "../lib/actions";
import Toast from "./Toast";

function Stars({ rating, interactive = false, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`text-2xl transition-transform ${
            interactive ? "hover:scale-110" : ""
          } ${star <= rating ? "text-brand-pink" : "text-brand-peach/50"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment || "");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [isPending, startTransition] = useTransition();

  const product = review.products;

  const date = new Date(review.created_at).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function showToast(message, type = "success") {
    setToast({
      message,
      type,
    });
  }

  function handleUpdate(formData) {
    startTransition(async () => {
      const result = await updateReviewAction(formData);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      setIsEditing(false);

      showToast(
        result.message || "Your review was updated successfully!",
        "success",
      );
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) return;

    const formData = new FormData();
    formData.append("reviewId", review.id);

    startTransition(async () => {
      const result = await deleteReviewAction(formData);

      if (!result.success) {
        showToast(result.error, "error");
        return;
      }

      showToast(
        result.message || "Your review was deleted successfully!",
        "success",
      );
    });
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

      <article className="rounded-3xl border border-brand-peach/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${product?.slug}`}
              className="font-poppins text-xl font-bold text-brand-dark transition-colors hover:text-brand-blue"
            >
              {product?.name || "Product"}
            </Link>

            <p className="mt-1 font-inter text-sm text-brand-navy/50">
              Reviewed on {date}
            </p>
          </div>

          <div className="rounded-full bg-brand-pink/10 px-3 py-1">
            <span className="font-poppins text-xs font-semibold text-brand-pink">
              Your Review
            </span>
          </div>
        </div>

        {isEditing ? (
          <form
            action={handleUpdate}
            className="mt-6 border-t border-brand-peach/40 pt-6"
          >
            <input type="hidden" name="reviewId" value={review.id} />

            <div>
              <label className="font-poppins text-sm font-semibold text-brand-dark">
                Rating
              </label>

              <div className="mt-2">
                <Stars rating={rating} interactive onChange={setRating} />
              </div>

              <input type="hidden" name="rating" value={rating} />
            </div>

            <div className="mt-5">
              <label
                htmlFor={`comment-${review.id}`}
                className="font-poppins text-sm font-semibold text-brand-dark"
              >
                Review
              </label>

              <textarea
                id={`comment-${review.id}`}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-brand-peach/60 bg-brand-cream/40 px-4 py-3 font-inter text-sm text-brand-dark outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Tell us what you think..."
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-brand-navy px-5 py-2.5 font-poppins text-sm font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  setRating(review.rating);
                  setComment(review.comment || "");
                  setIsEditing(false);
                }}
                className="rounded-xl border border-brand-navy/20 px-5 py-2.5 font-poppins text-sm font-semibold text-brand-navy transition hover:bg-brand-cream"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mt-6 rounded-2xl bg-brand-cream/60 p-5">
              <Stars rating={review.rating} />

              <p className="mt-3 font-inter text-[15px] leading-7 text-brand-dark/80">
                {review.comment}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/products/${product?.slug}`}
                className="font-inter text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy"
              >
                View Product →
              </Link>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl border border-brand-navy/15 px-4 py-2 font-poppins text-sm font-semibold text-brand-navy transition hover:border-brand-blue hover:bg-brand-blue/5"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-xl border border-brand-red/20 px-4 py-2 font-poppins text-sm font-semibold text-brand-red transition hover:bg-brand-red/5 disabled:opacity-50"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}
