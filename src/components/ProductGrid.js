"use client";

import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center text-white/60">
        No cards match your filters. Try clearing search or pick another
        category.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
