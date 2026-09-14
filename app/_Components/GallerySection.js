import Image from "next/image";
// import { galleryImage } from "../../public/gallery/gallery-1.jpg";

const galleryImages = [
  {
    src: "/gallery/gallery-1.jpeg",
    alt: "Handmade crochet creation",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/gallery/gallery-2.jpeg",
    alt: "Handmade crochet accessory",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/gallery/gallery-3.jpeg",
    alt: "Colorful crochet creation",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/gallery/gallery-4.jpeg",
    alt: "Crochet handmade product",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/gallery/gallery-5.jpeg",
    alt: "Cute crochet creation",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/gallery/gallery-6.jpeg",
    alt: "Handcrafted crochet piece",
    className: "col-span-2 row-span-2",
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-brand-cream px-6 py-20 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-peach/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-brand-pink/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-brand-red" />

            <p className="font-inter text-xs font-bold uppercase tracking-[3px] text-brand-red">
              Our Creations
            </p>

            <span className="h-0.5 w-8 bg-brand-red" />
          </div>

          <h2 className="font-poppins text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            A little look at
            <br />
            <span className="text-brand-pink">Anhad&apos;s crochet world</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl font-inter text-base leading-7 text-brand-dark/60">
            Every stitch tells a story. Explore some of Anhad&apos;s favorite
            handmade creations.
          </p>
        </div>

        <div
          className="
            grid
            auto-rows-37.5
            grid-cols-2
            gap-3
            sm:auto-rows-45
            sm:gap-4
            md:grid-cols-4
            lg:auto-rows-47.5
          "
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-brand-peach
                shadow-sm
                ${image.className}
              `}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 25vw,
                  300px
                "
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-brand-navy/0
                  transition-colors
                  duration-300
                  group-hover:bg-brand-navy/20
                "
              />

              <div
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-cream/90
                  font-inter
                  text-xs
                  font-bold
                  text-brand-navy
                  opacity-0
                  shadow-sm
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  group-hover:opacity-100
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/shop"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border-2
              border-brand-navy
              px-7
              py-3.5
              font-inter
              text-sm
              font-semibold
              text-brand-navy
              transition-all
              duration-300
              hover:bg-brand-navy
              hover:text-white
            "
          >
            Explore the Shop
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
