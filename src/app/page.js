"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import Button from "@/components/Button";
import { categories } from "@/data/products";
import { getFeaturedProducts } from "@/data/products";

const perks = [
  {
    title: "Authentic cards",
    body: "Official Kayou and licensed lines — curated before they hit your binder.",
  },
  {
    title: "Safe packaging",
    body: "Sleeves, toploaders, and rigid mailers so holos arrive pristine.",
  },
  {
    title: "Fast delivery",
    body: "Priority handling for in-stock pulls; tracking on every order.",
  },
  {
    title: "Collector quality",
    body: "Sharp corners, clean surfaces, and photos that match what you get.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Featured"
          title="Grails landing this week"
          subtitle="SSR sparkle, MR depth, and wave-fresh inventory — tap a card for specs, rarity, and tier notes."
        />
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/shop" variant="secondary">
            Browse full shop
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Browse"
          title="Shop by series"
          subtitle="Jump straight into your favorite universe. More waves are synced in as we expand inventory."
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {categories.map((c) => (
            <motion.li
              key={c}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(c)}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-neon-orange/50 hover:bg-white/10 hover:shadow-neon"
              >
                <span className="font-display text-lg font-bold text-white group-hover:text-neon-orange">
                  {c}
                </span>
                <span className="mt-6 text-xs font-semibold text-neon-orange opacity-0 transition group-hover:opacity-100">
                  View cards →
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-neon-orange/30 bg-black p-[1px] shadow-neon"
        >
          <div className="relative rounded-[1.4rem] bg-ink/90 px-6 py-10 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-orange/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 left-10 h-36 w-36 rounded-full bg-neon-orange/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
                Rare collection
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                MR, Premium, and wave-locked grails
              </h3>
              <p className="mt-3 text-sm text-white/65 sm:text-base">
                Higher tiers, thicker holo, and the chase cards collectors talk
                about — filtered in one tap for your binder roadmap.
              </p>
              <div className="mt-6">
                <Button href="/shop?filter=rare">Open rare collection</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          align="center"
          eyebrow="Trust"
          title="Why buy from AuraCards"
          subtitle="Built for collectors first — checkout and admin can extend later without redoing the experience."
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {perks.map((p) => (
            <motion.li
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-orange text-lg text-black">
                ✦
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-white">
                {p.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {p.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </>
  );
}
