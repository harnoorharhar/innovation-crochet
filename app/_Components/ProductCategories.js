"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { name: "All Products", slug: "all" },
  { name: "Bags", slug: "bags" },
  { name: "Plushies", slug: "plushies" },
  { name: "Accessories", slug: "accessories" },
  { name: "Home", slug: "home" },
  { name: "Custom", slug: "custom" },
];

function ProductCategories() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  return (
    <div className="mb-10 overflow-x-auto border-y border-brand-dark/10">
      <div className="flex min-w-max items-center gap-2 py-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <Link
              key={category.slug}
              href={
                category.slug === "all"
                  ? "/shop/products"
                  : `/shop/products?category=${category.slug}`
              }
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-brand-dark text-white"
                  : "text-slate-600 hover:bg-brand-cream hover:text-brand-dark"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategories;
