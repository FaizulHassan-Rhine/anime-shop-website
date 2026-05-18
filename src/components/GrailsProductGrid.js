"use client";

import FeaturedProductCard from "@/components/FeaturedProductCard";
import { getGlowForIndex, getStockMeta } from "@/lib/stockMeta";

export default function GrailsProductGrid({ products, emptyMessage }) {
  if (!products.length) {
    return (
      <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center text-sm text-white/50">
        {emptyMessage ??
          "No cards match these filters. Try another category or rarity."}
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, i) => (
        <FeaturedProductCard
          key={product.id}
          product={product}
          glow={getGlowForIndex(i)}
          stockMeta={getStockMeta(product, i)}
          index={i}
        />
      ))}
    </div>
  );
}
