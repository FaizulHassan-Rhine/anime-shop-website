import Link from "next/link";
import { allSeries } from "@/data/series";
import SeriesCard from "@/components/SeriesCard";

export const metadata = {
  title: "All Series — TCG Shop BD",
  description:
    "Browse every TCG series at TCG Shop BD — Naruto, One Piece, Yu-Gi-Oh!, Pokémon, FIFA, Jujutsu Kaisen, and more.",
};

export default function AllSeriesPage() {
  return (
    <section className="bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-orange">
            All series
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            Browse every shop
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
            Tap a series to open its catalog on the shop page — filters, search,
            and card details work the same as everywhere else.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allSeries.map((series, index) => (
            <SeriesCard key={series.name} series={series} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="text-sm font-semibold text-neon-orange transition hover:underline"
          >
            View full card catalog →
          </Link>
        </div>
      </div>
    </section>
  );
}
