"use client";

import Link from "next/link";
import { getFeaturedSeries } from "@/data/series";
import SeriesCard from "@/components/SeriesCard";

export default function SeriesBrowse() {
  const featured = getFeaturedSeries();

  return (
    <section className="border-t border-white/[0.06] bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-orange">
              Browse series
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              Shop by series
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
              Pick a series to view cards, rarities, and waves — same catalog
              layout as the shop page.
            </p>
          </div>
          <Link
            href="/series"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-neon-orange/40 hover:bg-white/[0.08] hover:text-neon-orange"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((series, index) => (
            <SeriesCard key={series.name} series={series} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
