"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SeriesTicker from "@/components/SeriesTicker";

const stats = [
  { value: "12K+", label: "Cards" },
  { value: "500+", label: "Series" },
  { value: "98%", label: "Authentic" },
];

const miniCards = [
  {
    name: "Sasuke",
    subtitle: "Uchiha · SR",
    price: "$32",
    icon: "🍥",
    href: "/shop?category=Naruto",
  },
  {
    name: "Luffy Gear 5",
    subtitle: "Sun God · UR",
    price: "$89",
    icon: "☠️",
    href: "/shop?category=One%20Piece",
  },
];

const stackCards = [
  {
    id: "zoro",
    eyebrow: "One Piece",
    name: "Zoro",
    subtitle: "Three Sword Style",
    rarity: "SSR",
    rarityClass: "bg-emerald-500/20 text-emerald-300",
    tier: "Tier 3",
    price: "$36",
    restRotate: -14,
    restX: -72,
    restY: 24,
  },
  {
    id: "naruto",
    eyebrow: "Naruto",
    name: "Naruto Uzumaki",
    subtitle: "Hokage · Seventh",
    rarity: "SSR",
    rarityClass: "bg-blue-500/20 text-blue-300",
    tier: "Tier 2",
    price: "$28",
    restRotate: 12,
    restX: 72,
    restY: 32,
  },
  {
    id: "itachi",
    eyebrow: "Featured",
    name: "Itachi Uchiha",
    subtitle: "Uchiha Clan · Akatsuki",
    rarity: "MR",
    rarityClass: "bg-violet-500/20 text-violet-300",
    tier: "Tier 4",
    price: "$48",
    restRotate: 0,
    restX: 0,
    restY: 0,
  },
];

function getSlideOffset(index, activeIndex, total) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function ChevronIcon({ direction }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
      />
    </svg>
  );
}

function HeroCardSlider() {
  const total = stackCards.length;
  const defaultIndex = stackCards.findIndex((c) => c.id === "itachi");
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex >= 0 ? defaultIndex : 0
  );
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-full sm:max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full bg-neon-orange/20 blur-[90px] sm:h-96 sm:w-96" />
      </div>

      <motion.div
        className="relative mx-auto h-[480px] w-full sm:h-[540px] lg:h-[560px]"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative h-full w-full touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
        >
          {stackCards.map((card, index) => {
            const offset = getSlideOffset(index, activeIndex, total);
            const isActive = offset === 0;
            const x = offset === 0 ? 0 : offset < 0 ? -100 : 100;
            const rotate = offset === 0 ? 0 : offset < 0 ? -14 : 12;
            const y = offset === 0 ? 0 : 20;

            return (
              <motion.div
                key={card.id}
                className="absolute left-1/2 top-1/2 w-[260px] cursor-pointer sm:w-[280px] lg:w-[300px]"
                style={{
                  transformOrigin: "center center",
                  zIndex: isActive ? 30 : 10 - Math.abs(offset),
                }}
                onClick={() => goTo(index)}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y: `calc(-50% + ${y}px)`,
                  rotate,
                  scale: isActive ? 1.05 : 0.86,
                  opacity: isActive ? 1 : 0.42,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
            <div
              className={`overflow-hidden rounded-2xl border bg-gradient-to-b from-[#1c1810] to-black p-[1px] transition-shadow duration-300 ${
                isActive
                  ? "border-neon-orange/60 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
                  : "border-neon-orange/20 shadow-card"
              }`}
            >
              <div className="rounded-[15px] bg-gradient-to-b from-[#14120e] to-black p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neon-orange/80">
                    {card.eyebrow}
                  </span>
                  <span className="rounded-md border border-neon-orange/40 bg-neon-orange/10 px-2 py-0.5 text-[9px] font-bold uppercase text-neon-orange">
                    {card.tier}
                  </span>
                </div>

                <div className="relative mt-2.5 flex aspect-[3/4] min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-black/80 sm:mt-3 sm:min-h-[320px] lg:min-h-[360px]">
                  {isActive ? (
                    <>
                      <svg
                        className="mb-2 h-10 w-10 text-white/20 sm:h-12 sm:w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-[10px] text-white/30">
                        Drop image here
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl opacity-30">🃏</span>
                      <span className="mt-2 text-[9px] font-bold uppercase tracking-wider text-white/30">
                        {card.name.split(" ")[0]}
                      </span>
                    </>
                  )}
                </div>

                {isActive ? (
                  <div className="mt-3">
                    <p className="text-base font-bold text-white sm:text-lg">{card.name}</p>
                    <p className="text-[11px] text-white/45">{card.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${card.rarityClass}`}
                      >
                        {card.rarity}
                      </span>
                      <p className="text-2xl font-bold text-neon-orange">
                        {card.price}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
            );
          })}
        </motion.div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous card"
          className="absolute left-0 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white/70 transition hover:border-neon-orange/40 hover:text-neon-orange sm:-left-2"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next card"
          className="absolute right-0 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white/70 transition hover:border-neon-orange/40 hover:text-neon-orange sm:-right-2"
        >
          <ChevronIcon direction="right" />
        </button>
      </motion.div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {stackCards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${card.name}`}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex
                ? "w-6 bg-neon-orange"
                : "w-1.5 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5.5rem)] flex-col overflow-hidden sm:min-h-[calc(100vh-6rem)]">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-neon-orange/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-neon-orange/[0.05] blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-6 sm:px-6 sm:py-14 lg:px-8">
        <motion.div className="grid flex-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon-orange">
                Premium Collectibles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              Collect{" "}
              <span className="text-neon-orange">Rare</span>
              <br />
              <span className="text-neon-orange">Anime Cards</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
            >
              Buy official Naruto, One Piece, and premium anime trading cards
              from verified sources.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex gap-8 sm:gap-12"
            >
              {stats.map((s) => (
                <li key={s.label}>
                  <p className="text-2xl font-bold text-neon-orange sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {s.label}
                  </p>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg bg-neon-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-neon transition hover:bg-neon-orange/90"
              >
                Shop Cards
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/5"
              >
                View Collection
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {miniCards.map((card) => (
                <li key={card.name}>
                  <Link
                    href={card.href}
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition hover:border-neon-orange/30 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black text-lg">
                      {card.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white group-hover:text-neon-orange">
                        {card.name}
                      </p>
                      <p className="text-[11px] text-white/45">{card.subtitle}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-neon-orange">
                      {card.price}
                    </p>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <HeroCardSlider />
          </motion.div>
        </motion.div>
      </div>

      <SeriesTicker />
    </section>
  );
}
