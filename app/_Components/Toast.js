"use client";

import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed right-5 top-5 z-50 w-[calc(100%-2.5rem)] max-w-sm animate-in slide-in-from-right-5 fade-in">
      <div
        className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
          isSuccess ? "border-brand-pink/30" : "border-brand-red/30"
        }`}
      >
        {isSuccess ? (
          <IoCheckmarkCircle className="mt-0.5 shrink-0 text-2xl text-green-700" />
        ) : (
          <IoCloseCircle className="mt-0.5 shrink-0 text-2xl text-brand-red" />
        )}

        <div className="flex-1">
          <p className="font-poppins text-sm font-semibold text-brand-dark">
            {isSuccess ? "Success!" : "Something went wrong"}
          </p>

          <p className="mt-1 font-inter text-sm text-brand-navy/70">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="font-inter text-lg text-brand-navy/40 transition hover:text-brand-navy"
        >
          ×
        </button>
      </div>
    </div>
  );
}
