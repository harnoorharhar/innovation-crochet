"use client";

import { startTransition, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { addReview } from "../lib/actions";

function AddReviewForm({ productId, onSuccess, productSlug }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const newReview = await addReview(formData);

        setRating(0);
        setComment("");

        toast.success("Review added successfully!", {
          position: "bottom-right",
        });

        onSuccess?.(newReview);
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    });
  }

  return (
    <>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-brand-pink">
          Give us a Rating
        </h3>

        <p className="mb-2 text-sm text-gray-500">
          Share your experience with this product.
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`text-2xl transition hover:scale-110 ${
                star <= (hoverRating || rating)
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
              aria-label={`Give ${star} star${star === 1 ? "" : "s"}`}
            >
              {star <= (hoverRating || rating) ? <BsStarFill /> : <BsStar />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="productSlug" value={productSlug} />

          <input type="hidden" name="rating" value={rating} />

          <label
            htmlFor="review"
            className="mb-2 block text-sm font-medium text-brand-dark"
          >
            Your review
          </label>

          <textarea
            id="review"
            name="comment"
            rows={4}
            maxLength={500}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you think about this product..."
            className="w-full resize-none rounded-xl border border-brand-peach/50 px-4 py-3 text-sm outline-none transition focus:border-brand-blue"
          />

          <p className="mt-1 text-right text-xs text-gray-400">
            {comment.length}/500
          </p>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            Add review
          </button>
        </form>
      </div>
    </>
  );
}

export default AddReviewForm;
