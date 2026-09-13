"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold text-brand-dark">
        Something went wrong!
      </h1>

      <p className="max-w-lg text-lg text-gray-600">{error.message}</p>

      <button
        onClick={reset}
        className="rounded-lg bg-brand-blue px-6 py-3 text-lg font-semibold text-white transition hover:bg-brand-navy"
      >
        Try again
      </button>
    </main>
  );
}
