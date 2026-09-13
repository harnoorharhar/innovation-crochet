import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-brand-cream py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-peach/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-3 top-8 h-4 w-4 rounded-full bg-brand-peach sm:-left-6" />
            <div className="absolute left-10 top-0 h-3 w-3 rounded-full bg-brand-pink" />

            <div className="absolute bottom-8 right-0 h-4 w-4 rounded-full bg-brand-blue" />
            <div className="absolute bottom-20 right-8 h-3 w-3 rounded-full bg-brand-peach" />

            <div
              className="
                absolute
                left-3
                top-10
                h-97.5
                w-[82%]
                rounded-4xl
                bg-brand-peach
                sm:h-107.5
              "
            />

            <div
              className="
                relative
                left-4
                top-5
                h-97.5
                w-[82%]
                overflow-hidden
                rounded-4xl
                bg-brand-pink
                shadow-xl
                sm:left-8
                sm:h-107.5
              "
            >
              <Image
                src="/hero-img-2.png"
                alt="Handmade crochet creation"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 500px"
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-brand-navy/10" />
            </div>

            <div
              className="
                absolute
                right-0
                top-20
                z-10
                flex
                h-36
                w-36
                rotate-6
                flex-col
                items-center
                justify-center
                rounded-full
                border-[6px]
                border-brand-peach
                bg-brand-cream
                shadow-xl
                sm:right-2
                sm:h-40
                sm:w-40
              "
            >
              <span className="font-poppins text-4xl font-bold text-brand-navy">
                2+
              </span>

              <span className="mt-1 text-center font-inter text-xs font-semibold uppercase tracking-wide text-brand-navy/70">
                Years of
                <br />
                Creativity
              </span>
            </div>

            <div
              className="
                absolute
                bottom-0
                left-0
                z-10
                rounded-full
                border
                border-brand-navy/10
                bg-white/90
                px-5
                py-3
                shadow-lg
                backdrop-blur-sm
              "
            >
              <p className="font-poppins text-sm font-semibold text-brand-navy">
                Handmade with ♡
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-brand-red" />

              <p className="font-inter text-sm font-bold uppercase tracking-[3px] text-brand-red">
                About Innovation Crochet
              </p>
            </div>

            <h2 className="font-poppins text-4xl font-bold leading-[1.12] tracking-tight text-brand-dark sm:text-5xl lg:text-[54px]">
              From a hobby
              <br />
              <span className="text-brand-pink">to a little business.</span>
            </h2>

            <p className="mt-7 font-inter text-base leading-8 text-brand-dark/70">
              Two years ago, Anhad started learning crochet from YouTube videos.
              She loved turning yarn into cute, handmade creations. With
              practice and patience, crocheting became her favorite hobby.
            </p>

            <p className="mt-4 font-inter text-base leading-8 text-brand-dark/70">
              What started as something fun slowly became a business. Anhad
              began making crochet pieces and sharing them with others. Today,
              she continues to learn new designs and grow Innovation Crochet one
              stitch at a time.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-navy/10 bg-white/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach/40 text-lg">
                  🧶
                </div>

                <h3 className="font-poppins text-sm font-bold text-brand-navy">
                  Handmade
                </h3>

                <p className="mt-1 font-inter text-xs leading-5 text-brand-dark/60">
                  Every piece is carefully crafted by hand.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-navy/10 bg-white/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink/20 text-lg">
                  ✦
                </div>

                <h3 className="font-poppins text-sm font-bold text-brand-navy">
                  One of a Kind
                </h3>

                <p className="mt-1 font-inter text-xs leading-5 text-brand-dark/60">
                  Creative designs made to stand out.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-brand-navy
                px-7
                py-4
                font-inter
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-brand-navy/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-brand-pink
                hover:shadow-xl
              "
            >
              Explore Our Creations
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-8 w-full"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,25 C200,5 300,38 500,20 C700,2 850,35 1050,18 C1120,12 1160,15 1200,10 L1200,40 L0,40 Z"
            fill="#172554"
            fillOpacity="0.04"
          />
        </svg>
      </div>
    </section>
  );
}
