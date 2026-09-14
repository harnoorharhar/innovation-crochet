"use client";

import { createClient } from "@/app/lib/supabase/client";

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-brand-peach/50 bg-white px-5 py-3.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
    >
      <span className="text-lg font-bold">G</span>
      Continue with Google
    </button>
  );
}