import Image from "next/image";

function ProductGallery({ images, productName, productId }) {
  return (
    <div className="flex gap-4">
      <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
        {images.map((image, index) => (
          <button
            key={productId}
            type="button"
            className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-white ${
              index === 0
                ? "border-brand-blue"
                : "border-brand-peach/50 hover:border-brand-blue"
            }`}
          >
            <Image
              src={image.url}
              alt={`${productName} ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full h-130 overflow-hidden rounded-2xl border border-brand-peach/50 bg-white">
        <Image
          src={images[0].url}
          alt={images[0].alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-brand-cream px-4 py-2 text-xs font-semibold text-brand-pink shadow-sm">
          Handmade ♡
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
