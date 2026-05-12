"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";
import RarityFilter from "@/components/RarityFilter";
import { products, categories, rarities } from "@/data/products";

function matchesRareCollection(p) {
  return p.price >= 100 || ["MR", "Premium", "Rare"].includes(p.rarity);
}

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A → Z" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [rarePreset, setRarePreset] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const cat = searchParams.get("category");
    const preset = searchParams.get("preset");
    const filter = searchParams.get("filter");
    if (cat) setCategory(cat);
    setRarePreset(preset === "rare" || filter === "rare");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (rarePreset && !matchesRareCollection(p)) return false;
      if (category !== "all" && p.anime !== category) return false;
      if (rarity !== "all" && p.rarity !== rarity) return false;
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

  const activeFilters = [
    category !== "all" ? { id: "cat", label: category, clear: () => setCategory("all") } : null,
    rarity !== "all" ? { id: "rar", label: rarity, clear: () => setRarity("all") } : null,
    query.trim() ? { id: "q", label: `“${query.trim()}”`, clear: () => setQuery("") } : null,
    rarePreset ? { id: "pre", label: "Rare collection", clear: () => setRarePreset(false) } : null,
  ].filter(Boolean);

  function clearAll() {
    setCategory("all");
    setRarity("all");
    setQuery("");
    setRarePreset(false);
    setSort("featured");
  }

  return (
    <div className="relative">
      {/* Page header band */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-x-0 -top-px h-px bg-neon-orange/60" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-xs text-white/45">
            <Link href="/" className="transition hover:text-white/80">
              Home
            </Link>
            <span className="text-white/25">/</span>
            <span className="text-white/80">Shop</span>
          </nav>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neon-orange"
              >
                The Collection
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
              >
                Curated{" "}
                <span className="text-neon-orange">
                  Premium Cards
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[15px]"
              >
                Hand-picked Kayou official grails, MR finishes and limited
                waves. Filter, search and add to cart — every card is
                verified, sleeved and ready to ship.
              </motion.p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/55">
              <Stat label="Cards" value={products.length} />
              <span className="h-6 w-px bg-white/10" />
              <Stat label="Series" value={categories.length} />
              <span className="h-6 w-px bg-white/10" />
              <Stat label="Authenticity" value="100%" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Toolbar: search + sort + results */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Itachi, SSR, Wave 3…"
              className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 transition focus:border-neon-orange/60 focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-white/45">
              <span className="font-semibold text-white">
                {filtered.length}
              </span>{" "}
              of {products.length} cards
            </span>
            <span className="hidden h-5 w-px bg-white/10 sm:block" />
            <label className="flex items-center gap-2 text-xs text-white/55">
              <span className="font-semibold uppercase tracking-wider text-white/45">
                Sort
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-lg border border-white/10 bg-black/30 py-2 pl-3 pr-8 text-xs font-medium text-white transition hover:border-white/20 focus:border-neon-orange/60 focus:outline-none focus:ring-2 focus:ring-neon-orange/30"
                >
                  {SORTS.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      className="bg-surface text-white"
                    >
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/45" />
              </div>
            </label>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Active
            </span>
            {activeFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={f.clear}
                className="group inline-flex items-center gap-1.5 rounded-full border border-neon-orange/40 bg-neon-orange/10 px-3 py-1 text-[11px] font-semibold text-white transition hover:border-neon-orange/70 hover:bg-neon-orange/15"
              >
                {f.label}
                <span className="text-white/60 transition group-hover:text-white">
                  ✕
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="ml-1 text-[11px] font-semibold text-white/45 underline-offset-2 transition hover:text-white hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filter sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <p className="font-display text-sm font-semibold tracking-wide text-white">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[11px] font-semibold text-white/45 transition hover:text-white"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6 px-5 py-5">
                <CategoryFilter
                  categories={categories}
                  selected={category}
                  onChange={setCategory}
                />
                <div className="h-px bg-white/5" />
                <RarityFilter
                  rarities={rarities}
                  selected={rarity}
                  onChange={setRarity}
                />
                <div className="h-px bg-white/5" />
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                    Collections
                  </p>
                  <button
                    type="button"
                    onClick={() => setRarePreset((v) => !v)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                      rarePreset
                        ? "border-neon-orange/50 bg-neon-orange/15 text-white shadow-[0_0_20px_-8px_rgba(251,146,60,0.6)]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          rarePreset ? "bg-neon-orange" : "bg-white/30"
                        }`}
                      />
                      Rare collection
                    </span>
                    <span className="text-white/40">
                      MR · Premium · $100+
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neon-orange">
                Concierge
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                Looking for a specific grail?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/55">
                We source rare Kayou waves on request — typical turnaround
                3–10 days.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-neon-orange transition hover:text-white"
              >
                Talk to us
                <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-base font-bold text-white">
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
        {label}
      </span>
    </div>
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

function ChevronIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
