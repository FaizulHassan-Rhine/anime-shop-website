"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GrailsCatalogHeader from "@/components/GrailsCatalogHeader";
import GrailsFilters from "@/components/GrailsFilters";
import GrailsProductGrid from "@/components/GrailsProductGrid";
import { products, categories } from "@/data/products";

const categoryFilters = ["All", ...categories];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A → Z" },
];

function matchesRareCollection(p) {
  return p.price >= 100 || ["MR", "Premium", "Rare"].includes(p.rarity);
}

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");
  const [rarity, setRarity] = useState("All");
  const [rarePreset, setRarePreset] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const cat = searchParams.get("category");
    const preset = searchParams.get("preset");
    const filter = searchParams.get("filter");
    if (cat) setCategory(cat);
    else setCategory("All");
    setRarePreset(preset === "rare" || filter === "rare");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (rarePreset && !matchesRareCollection(p)) return false;
      if (category !== "All" && p.anime !== category) return false;
      if (rarity !== "All" && p.rarity !== rarity) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const blob =
          `${p.name} ${p.anime} ${p.rarity} ${p.tier} ${p.wave}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [category, rarity, query, rarePreset, sort]);

  const toolbar = (
    <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cards, rarity, wave…"
          className="w-full rounded-lg border border-white/10 bg-black py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 transition focus:border-neon-orange/50 focus:outline-none focus:ring-1 focus:ring-neon-orange/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
        <span>
          <span className="font-bold text-white">{filtered.length}</span> of{" "}
          {products.length} cards
        </span>
        <label className="flex items-center gap-2 font-semibold uppercase tracking-wider text-white/45">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] py-2 pl-3 pr-8 text-xs font-medium normal-case text-white transition hover:border-white/20 focus:border-neon-orange/50 focus:outline-none focus:ring-1 focus:ring-neon-orange/40"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        {rarePreset ? (
          <button
            type="button"
            onClick={() => setRarePreset(false)}
            className="rounded-full border border-neon-orange/40 bg-neon-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neon-orange transition hover:bg-neon-orange/15"
          >
            Rare collection ✕
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setRarePreset(true)}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/50 transition hover:border-white/20 hover:text-white"
          >
            Rare only
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GrailsCatalogHeader
          eyebrow="Shop"
          title="Grails Landing This Week"
          subtitle="SSR sparkle, MR depth, and wave-fresh inventory — tap a card for specs, rarity, and tier notes."
        />

        <GrailsFilters
          categories={categoryFilters}
          category={category}
          onCategoryChange={setCategory}
          rarity={rarity}
          onRarityChange={setRarity}
          trailing={toolbar}
        />

        <GrailsProductGrid
          products={filtered}
          emptyMessage="No cards match your filters. Try another category, rarity, or search term."
        />
      </div>
    </section>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
