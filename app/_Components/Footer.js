import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white" id="footer">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-sm ">
            <Link
              href="/"
              className="inline-block font-poppins text-3xl font-bold tracking-tight"
            >
              Innovation
              <span className="text-brand-pink"> Crochet</span>
            </Link>

            <p className="mt-5 font-inter text-sm leading-7 text-white/60">
              Handmade crochet creations made with care, creativity, and a
              little bit of joy. 🧶
            </p>

            <div className="mt-7 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-peach" />
              <span className="h-2 w-8 rounded-full bg-brand-pink" />
              <span className="h-2 w-2 rounded-full bg-brand-blue" />
              <span className="h-2 w-8 rounded-full bg-brand-peach" />
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-peach">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-inter text-sm text-white/60 transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="font-inter text-sm text-white/60 transition hover:text-white"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="font-inter text-sm text-white/60 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/#gallery"
                  className="font-inter text-sm text-white/60 transition hover:text-white"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-peach">
              Let&apos;s Connect
            </h3>

            <p className="mt-5 font-inter text-sm leading-6 text-white/60">
              Have a question or want something custom?
              <br />
              We&apos;d love to hear from you.
            </p>

            <Link
              href="/contact"
              className="
                group
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-brand-pink
                px-5
                py-3
                font-inter
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-brand-peach
                hover:text-brand-navy
              "
            >
              Get in Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-px bg-white/10" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="font-inter text-xs text-white/40">
          © {new Date().getFullYear()} Innovation Crochet. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="font-inter text-xs text-white/40 transition hover:text-white"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="font-inter text-xs text-white/40 transition hover:text-white"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
