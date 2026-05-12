"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-neon-orange/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-neon-orange/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-orange"
            >
              Premium collectibles
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Collect Rare{" "}
              <span className="text-neon-orange">
                Anime Cards
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Buy official Naruto, One Piece, and premium anime trading cards.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/shop">Shop Cards</Button>
              <Button href="/shop?filter=rare" variant="secondary">
                View Rare Collection
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 -rotate-6 rounded-3xl bg-neon-orange/15 blur-2xl" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15 bg-black p-1 shadow-card backdrop-blur-xl"
            >
              <div className="flex h-full flex-col rounded-[1.35rem] bg-black p-5 ring-1 ring-white/10">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/45">
                  <span>Kayou</span>
                  <span className="rounded-full bg-neon-orange/20 px-2 py-0.5 text-neon-orange">
                    MR
                  </span>
                </div>
                <div className="mt-4 flex flex-1 items-center justify-center rounded-2xl border border-neon-orange/20 bg-black ring-1 ring-white/10">
                  {/* Replace with real hero card art: add /public/cards/hero-showcase.png */}
                  <span className="text-center text-sm font-medium text-white/50">
                    Hero showcase
                    <br />
                    <span className="text-xs text-white/35">Drop PNG in /public/cards/</span>
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/45">Featured</p>
                    <p className="font-display text-lg font-bold text-white">
                      Itachi MR
                    </p>
                  </div>
                  <p className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-neon-orange">
                    Tier 4
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
