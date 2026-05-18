"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const glowStyles = {
  orange: {
    orb: "from-orange-500/80 via-amber-400/40 to-transparent",
    ring: "border-orange-500/30",
    pulse: "bg-orange-500/20",
  },
  purple: {
    orb: "from-violet-500/80 via-purple-400/40 to-transparent",
    ring: "border-violet-500/30",
    pulse: "bg-violet-500/20",
  },
  red: {
    orb: "from-red-500/80 via-rose-400/40 to-transparent",
    ring: "border-red-500/30",
    pulse: "bg-red-500/20",
  },
  blue: {
    orb: "from-blue-500/80 via-cyan-400/40 to-transparent",
    ring: "border-blue-500/30",
    pulse: "bg-blue-500/20",
  },
};

const tagColors = {
  MR: "border-violet-500/40 bg-violet-500/15 text-violet-300",
  SSR: "border-blue-500/40 bg-blue-500/15 text-blue-300",
  Premium: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Rare: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
};

function stockBadge(status) {
  if (status === "low-stock") {
    return {
      label: "Low stock",
      dot: "bg-red-400",
      text: "text-red-300",
      bg: "bg-red-500/10 border-red-500/25",
    };
  }
  if (status === "pre-order") {
    return {
      label: "Pre-order",
      dot: "bg-neon-orange",
      text: "text-neon-orange",
      bg: "bg-neon-orange/10 border-neon-orange/25",
    };
  }
  return {
    label: "In stock",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    bg: "bg-emerald-500/10 border-emerald-500/25",
  };
}

export default function FeaturedProductCard({
  product,
  glow = "orange",
  stockMeta,
  index = 0,
}) {
  const { addToCart } = useCart();
  const resetRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const glowStyle = glowStyles[glow] ?? glowStyles.orange;
  const stock = stockBadge(product.stockStatus);
  const pct = Math.round((stockMeta.remaining / stockMeta.total) * 100);
  const tagClass =
    tagColors[product.rarity] ??
    "border-white/15 bg-white/5 text-white/70";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] transition-all duration-300 group-hover:z-10 group-hover:scale-[1.02] group-hover:border-neon-orange/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]">
        <Link href={`/cards/${product.id}`} className="block flex-1 p-4 pb-3">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.06] bg-black"
            aria-hidden
          >
            <div
              className={`absolute inset-0 ${glowStyle.pulse} opacity-60`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${glowStyle.orb} shadow-[0_0_40px_rgba(212,175,55,0.25)]`}
              >
                <div
                  className={`absolute inset-2 rounded-full border ${glowStyle.ring}`}
                />
                <div
                  className={`absolute inset-5 rounded-full border ${glowStyle.ring} opacity-60`}
                />
                <div className="h-8 w-8 rounded-full bg-white/90 blur-[2px]" />
              </motion.div>
            </div>

            <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
              <span className="rounded-md border border-white/10 bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/80 backdrop-blur">
                {product.anime}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur ${stock.bg} ${stock.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${stock.dot}`} />
                {stock.label}
              </span>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm font-bold leading-snug text-white group-hover:text-neon-orange">
            {product.name}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span
              className={`rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tagClass}`}
            >
              {product.rarity}
            </span>
            <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/55">
              {product.tier}
            </span>
            <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/55">
              {product.wave}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
              Price
            </p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {stockMeta.originalPrice ? (
                <span className="text-sm text-white/35 line-through">
                  ${stockMeta.originalPrice.toFixed(2)}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                Availability
              </p>
              {stockMeta.badge ? (
                <span className="rounded border border-neon-orange/40 bg-neon-orange/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-neon-orange">
                  {stockMeta.badge}
                </span>
              ) : null}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  product.stockStatus === "low-stock"
                    ? "bg-red-500"
                    : "bg-neon-orange"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-white/40">
              {stockMeta.remaining} of {stockMeta.total} remaining
            </p>
          </div>
        </Link>

        <motion.div className="flex gap-2 p-4 pt-0">
          <Link
            href={`/cards/${product.id}`}
            className="flex-1 rounded-lg border border-white/15 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
          >
            View
          </Link>
          <motion.button
            type="button"
            onClick={() => {
              addToCart(product.id, 1);
              setJustAdded(true);
              if (resetRef.current) window.clearTimeout(resetRef.current);
              resetRef.current = window.setTimeout(
                () => setJustAdded(false),
                900
              );
            }}
            whileTap={{ scale: 0.97 }}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              justAdded
                ? "bg-emerald-500 text-black"
                : "bg-neon-orange text-black hover:bg-neon-orange/90"
            }`}
          >
            {justAdded ? "Added" : "Add to cart"}
          </motion.button>
        </motion.div>
      </div>
    </motion.article>
  );
}
