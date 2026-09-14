import Link from "next/link";

import { loginAction } from "../lib/actions";
import GoogleButton from "../_Components/GoogleButton";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  const redirectTo = params?.redirect || "/cart";

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-brand-dark"
          >
            Crochet
          </Link>

          <p className="mt-2 text-sm text-brand-navy">
            Welcome back! Login in to continue.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-peach/40 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-brand-dark">Login</h1>

          <p className="mt-2 text-sm text-brand-navy">
            Enter your account details below.
          </p>

          <form action={loginAction} className="mt-6 space-y-5">
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
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-brand-peach/50 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-navy/50 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-brand-dark"
                >
                  Password
                </label>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-brand-peach/50 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-navy/50 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-navy px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <GoogleButton />

          <div className="mt-6 border-t border-brand-peach/30 pt-6 text-center">
            Login
            <p className="text-sm text-brand-navy">Dont have an account?</p>
            <Link
              href={`/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="mt-2 inline-block text-sm font-semibold text-brand-blue hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brand-pink" />
      </div>
    </main>
  );
}
