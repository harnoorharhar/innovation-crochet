import Link from "next/link";

import { signupAction } from "../lib/actions";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold text-brand-dark">
            Crochet
          </Link>

          <p className="mt-2 text-sm text-brand-navy">
            Create your account to start shopping.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-peach/40 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-brand-dark">Create account</h1>

          <form action={signupAction} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-brand-dark"
              >
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-brand-peach/50 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-brand-dark"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-brand-peach/50 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="mb-2 block text-sm font-medium text-brand-dark"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-brand-peach/50 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-brand-dark"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-brand-peach/50 px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />

              <p className="mt-1 text-xs text-brand-navy">
                Must be at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-navy px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 border-t border-brand-peach/30 pt-6 text-center">
            <p className="text-sm text-brand-navy">Already have an account?</p>

            <Link
              href="/login"
              className="mt-2 inline-block text-sm font-semibold text-brand-blue hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brand-pink" />
      </div>
    </main>
  );
}
