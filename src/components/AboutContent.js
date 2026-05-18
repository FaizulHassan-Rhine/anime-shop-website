"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

const franchises = [
  "Naruto",
  "One Piece",
  "Jujutsu Kaisen",
  "Dragon Ball",
  "Pokémon",
  "Demon Slayer",
];

const pillars = [
  {
    title: "Quality",
    description:
      "Organized collections, detailed product information, and carefully selected card waves for every listing.",
    icon: "✦",
  },
  {
    title: "Authenticity",
    description:
      "Popular anime trading cards sourced with collectors in mind — trusted, exciting, and worth the hunt.",
    icon: "◎",
  },
  {
    title: "Collector experience",
    description:
      "From rare holo pulls and SSR/MR cards to booster packs, boxes, and limited-edition drops.",
    icon: "◈",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

export default function AboutContent() {
  return (
    <div className="relative overflow-hidden">
      <motion.div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-neon-orange/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-violet-500/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionTitle
          eyebrow="Our story"
          title="Built for collectors, powered by anime passion"
          subtitle="TCG Shop BD is a Bangladesh-based trading card marketplace for anime fans and collectors. We focus on bringing popular anime trading cards including Naruto, One Piece, Jujutsu Kaisen, Dragon Ball, Pokémon, Demon Slayer, and more to collectors across Bangladesh."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              From rare holo pulls and SSR/MR cards to booster packs, collector
              boxes, and limited-edition drops, our goal is to make collecting
              exciting, accessible, and trusted for the growing TCG community in
              Bangladesh.
            </p>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              We focus on quality, authenticity, and collector experience —
              offering organized collections, detailed product information, and
              carefully selected card waves so collectors can easily discover
              cards they genuinely want to own.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {franchises.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {[
              {
                label: "Marketplace",
                value: "Bangladesh",
                hint: "Local TCG shop for BD collectors",
              },
              {
                label: "Catalog",
                value: "Premium",
                hint: "Cards, packs, boxes & holos",
              },
              {
                label: "Community",
                value: "Growing",
                hint: "Events & drops on the way",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-neon-orange">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs text-white/45">{stat.hint}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:border-neon-orange/30"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-orange/25 bg-neon-orange/10 text-lg text-neon-orange">
                {item.icon}
              </span>
              <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-16 overflow-hidden rounded-2xl border border-neon-orange/20 bg-gradient-to-br from-neon-orange/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-orange">
              Community
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              More than a card shop
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Beyond selling cards, TCG Shop BD aims to build a strong anime and
              TCG community through future events, collector activities, and a
              growing marketplace for fans all around the country.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg bg-neon-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neon-orange/90"
              >
                Browse shop
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
