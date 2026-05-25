"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

function countForSeries(name) {
  return products.filter((p) => p.anime === name).length;
}

export default function SeriesCard({ series, index = 0 }) {
  const count = countForSeries(series.name);
  const href = `/shop?category=${encodeURIComponent(series.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={href}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:bg-white/[0.05] ${series.border}`}
      >
        <div className="relative aspect-[3/4] min-h-[200px] overflow-hidden bg-[#0a0a0a] sm:min-h-[240px]">
          <Image
            src={series.image}
            alt={series.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/70 backdrop-blur">
            {count > 0 ? `${count} cards` : "Coming soon"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold text-white group-hover:text-neon-orange sm:text-lg">
            {series.name}
          </h3>
          <p className="mt-1 text-xs text-white/45">{series.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neon-orange">
            View cards
            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
