"use client";

import { motion } from "framer-motion";

export default function RarityFilter({ rarities, selected, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
        Rarity
      </p>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={selected === "all"}
          onClick={() => onChange("all")}
        >
          All
        </FilterChip>
        {rarities.map((r) => (
          <FilterChip
            key={r}
            active={selected === r}
            onClick={() => onChange(r)}
          >
            {r}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ children, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-transparent bg-neon-orange text-black shadow-lg shadow-neon-orange/20"
          : "border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}
