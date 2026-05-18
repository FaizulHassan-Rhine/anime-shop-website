"use client";

import { useMemo, useState } from "react";
import GrailsCatalogHeader from "@/components/GrailsCatalogHeader";
import GrailsFilters from "@/components/GrailsFilters";
import GrailsProductGrid from "@/components/GrailsProductGrid";
import { getFeaturedProducts } from "@/data/products";

const categoryFilters = ["All", "Naruto", "One Piece", "Demon Slayer"];

export default function FeaturedGrails() {
  const featured = getFeaturedProducts();
  const [category, setCategory] = useState("All");
  const [rarity, setRarity] = useState("All");

  const filtered = useMemo(() => {
    return featured.filter((p) => {
      const matchCategory =
        category === "All" || p.anime.toLowerCase() === category.toLowerCase();
      const matchRarity = rarity === "All" || p.rarity === rarity;
      return matchCategory && matchRarity;
    });
  }, [featured, category, rarity]);

  return (
    <section className="border-t border-white/[0.06] bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GrailsCatalogHeader
          eyebrow="Featured"
          title="Grails Landing This Week"
          subtitle="SSR sparkle, MR depth, and wave-fresh inventory — tap a card for specs, rarity, and tier notes."
        />

        <GrailsFilters
          categories={categoryFilters}
          category={category}
          onCategoryChange={setCategory}
          rarity={rarity}
          onRarityChange={setRarity}
        />

        <GrailsProductGrid products={filtered} />
      </div>
    </section>
  );
}
