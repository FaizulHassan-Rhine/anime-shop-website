"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import GrailsCatalogHeader from "@/components/GrailsCatalogHeader";
import GrailsFilters from "@/components/GrailsFilters";
import GrailsProductGrid from "@/components/GrailsProductGrid";
import { products, categories } from "@/data/products";

const categoryFilters = ["All", ...categories];

const SUGGESTED_RARITIES = ["SR", "SSR", "UR", "AR", "OR", "PU", "MR", "SP"];

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "All";
  const rarePreset =
    searchParams.get("preset") === "rare" ||
    searchParams.get("filter") === "rare";

  const rarity = searchParams.get("rarity") ?? "All";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const replaceParams = useCallback(
    (mutate) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleCategoryChange = useCallback(
    (next) => {
      replaceParams((params) => {
        if (next === "All") params.delete("category");
        else params.set("category", next);
        if (next !== "Naruto" && params.has("rarity")) params.delete("rarity");
      });
    },
    [replaceParams]
  );

  const handleRarityChange = useCallback(
    (next) => {
      replaceParams((params) => {
        if (next === "All") params.delete("rarity");
        else params.set("rarity", next);
      });
    },
    [replaceParams]
  );

  const handleSuggestedRarity = useCallback(
    (value) => {
      handleRarityChange(rarity === value ? "All" : value);
    },
    [rarity, handleRarityChange]
  );

  const handleRarePresetToggle = useCallback(
    (enabled) => {
      replaceParams((params) => {
        if (enabled) {
          params.set("preset", "rare");
          params.delete("filter");
        } else {
          params.delete("preset");
          params.delete("filter");
        }
      });
    },
    [replaceParams]
  );

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
    <div className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 w-full flex-1">
        <div className="relative max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards, rarity, wave…"
            className="w-full rounded-lg border border-white/10 bg-black py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 transition focus:border-neon-orange/50 focus:outline-none focus:ring-1 focus:ring-neon-orange/40"
          />
        </div>
        {category === "Naruto" ? (
          <div className="mt-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 pr-0.5 text-[10px] font-bold uppercase tracking-wider text-white/35">
              Suggested
            </span>
            {SUGGESTED_RARITIES.map((r) => {
              const active = rarity === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSuggestedRarity(r)}
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                    active
                      ? "border-neon-orange/60 bg-neon-orange/10 text-neon-orange"
                      : "border-white/10 bg-black/40 text-white/50 hover:border-white/25 hover:text-white/80"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 text-xs text-white/50 lg:pt-1">
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
            onClick={() => handleRarePresetToggle(false)}
            className="rounded-full border border-neon-orange/40 bg-neon-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neon-orange transition hover:bg-neon-orange/15"
          >
            Rare collection ✕
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleRarePresetToggle(true)}
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
          onCategoryChange={handleCategoryChange}
          rarity={rarity}
          onRarityChange={handleRarityChange}
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
