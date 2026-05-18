"use client";

import { motion } from "framer-motion";
import { rarities } from "@/data/products";

export default function GrailsFilters({
  categories,
  category,
  onCategoryChange,
  rarity,
  onRarityChange,
  trailing,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="mt-8 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onCategoryChange(c)}
                className={`rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                  active
                    ? "border-neon-orange/60 bg-neon-orange/10 text-neon-orange"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <label className="flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/45">
          Rarity
          <select
            value={rarity}
            onChange={(e) => onRarityChange(e.target.value)}
            className="appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] py-2 pl-3 pr-8 text-xs font-medium text-white transition hover:border-white/20 focus:border-neon-orange/50 focus:outline-none focus:ring-1 focus:ring-neon-orange/40"
          >
            <option value="All">All</option>
            {rarities.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      {trailing ? <div>{trailing}</div> : null}
    </motion.div>
  );
}
