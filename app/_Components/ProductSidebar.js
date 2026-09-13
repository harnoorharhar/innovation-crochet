"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const priceRanges = [
  { label: "Under $20", value: "under-20" },
  { label: "$20 – $40", value: "20-40" },
  { label: "$40+", value: "40-plus" },
];

const ratings = [5, 4, 3];

function ProductSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(name, value, checked) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(params.toString() ? `${pathname}?${params}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    router.push(pathname, { scroll: false });
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <div className="border-b border-brand-dark/10 pb-6">
          <h2 className="font-poppins text-lg font-bold">Filter products</h2>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 text-sm font-medium text-brand-blue hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="border-b border-brand-dark/10 py-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Price
          </h3>

          <div className="space-y-3">
            {priceRanges.map((price) => (
              <label
                key={price.value}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-dark"
              >
                <input
                  type="checkbox"
                  checked={searchParams.get("price") === price.value}
                  onChange={(e) =>
                    updateFilter("price", price.value, e.target.checked)
                  }
                  className="h-4 w-4 rounded accent-brand-dark"
                />

                {price.label}
              </label>
            ))}
          </div>
        </div>

        <div className="border-b border-brand-dark/10 py-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Rating
          </h3>

          <div className="space-y-3">
            {ratings.map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-dark"
              >
                <input
                  type="checkbox"
                  checked={searchParams.get("rating") === String(rating)}
                  onChange={(e) =>
                    updateFilter("rating", String(rating), e.target.checked)
                  }
                  className="h-4 w-4 rounded accent-brand-dark"
                />

                <span className="text-brand-red">{"★".repeat(rating)}</span>

                <span>& up</span>
              </label>
            ))}
          </div>
        </div>

        <div className="py-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Availability
          </h3>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-dark">
            <input
              type="checkbox"
              checked={searchParams.get("stock") === "in-stock"}
              onChange={(e) =>
                updateFilter("stock", "in-stock", e.target.checked)
              }
              className="h-4 w-4 rounded accent-brand-dark"
            />
            In stock
          </label>
        </div>
      </div>
    </aside>
  );
}

export default ProductSidebar;
