import Image from "next/image";
import Link from "next/link";
import AboutSection from "./_Components/AboutSection";
import GallerySection from "./_Components/GallerySection";
import Footer from "./_Components/Footer";
import ScrollSectionTracker from "./_Components/ScrollSectionTracker";

export default function Page() {
  return (
    <>
      <ScrollSectionTracker />
      <div className="min-h-screen">
        <section className="px-6 py-20 sm:px-10 lg:px-20" id="home">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">
                Handmade with love
              </p>

              <h1 className="max-w-2xl text-5xl font-bold leading-tight text-brand-dark sm:text-6xl lg:text-7xl">
                Made by Hand.
                <br />
                <span className="text-brand-blue">Made for You.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-brand-dark/70">
                Meet Anhad, the 10-year-old creator behind Innovation Crochet.
                What started as a hobby from YouTube two years ago has grown
                into her own little business.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="rounded-full bg-brand-blue px-7 py-3 font-semibold text-brand-cream transition hover:bg-brand-pink hover:text-brand-cream"
                >
                  Shop Collection
                </Link>

                <Link
                  href="/#about"
                  className="rounded-full border-2 border-brand-dark px-7 py-3 font-semibold text-brand-dark transition hover:bg-brand-dark hover:text-brand-cream"
                >
                  Meet Anahd{" "}
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="aspect-square rounded-[3rem] bg-brand-peach p-8">
                <div className="relative mx-auto w-full max-w-lg">
                  <div className="aspect-square rounded-[3rem] bg-brand-peach p-0.1">
                    <div className="relative flex h-full items-center justify-center rounded-[2.5rem] bg-brand-pink overflow-hidden">
                      <Image
                        fill
                        className="object-cover"
                        src="/hero-img.png"
                        alt="Hero illustration"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-9 -left-5 rounded-2xl bg-brand-pink px-5 py-4 shadow-lg">
                  <p className="text-sm font-semibold text-brand-cream">
                    Handmade
                  </p>
                  <p className="text-sm text-brand-cream">
                    One stitch at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
        <GallerySection />
        <Footer />
      </div>
    </>
  );
}
