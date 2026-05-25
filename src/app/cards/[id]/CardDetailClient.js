"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Button from "@/components/Button";
import { getStockForProduct } from "@/lib/stockMeta";

function stockBadge(status, remaining) {
  if (status === "low-stock")
    return (
      <span className="rounded-full bg-neon-orange/20 px-3 py-1 text-xs font-bold text-neon-orange">
        Low stock{remaining > 0 ? ` · ${remaining} left` : ""}
      </span>
    );
  if (status === "pre-order")
    return (
      <span className="rounded-full bg-neon-orange/20 px-3 py-1 text-xs font-bold text-neon-orange">
        Pre-order
      </span>
    );
  return (
    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
      In stock
      {remaining > 0 ? ` · ${remaining} left` : ""}
    </span>
  );
}

export default function CardDetailClient({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const stock = getStockForProduct(product);
  const maxQty =
    product.stockStatus === "pre-order"
      ? 99
      : Math.max(1, stock.remaining);
  const pct =
    stock.total > 0
      ? Math.round((stock.remaining / stock.total) * 100)
      : 0;

  function handleAdd() {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="absolute inset-0 rounded-3xl bg-neon-orange/15 blur-2xl" />
        <div className="aura-ring relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink ring-1 ring-white/10">
            {/* Replace with your high-res scan: public{product.image} */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white/80">
            {product.anime}
          </span>
          {stockBadge(product.stockStatus, stock.remaining)}
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 text-lg font-bold text-neon-orange">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-5 max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Availability
            </p>
            {stock.badge ? (
              <span className="rounded border border-neon-orange/40 bg-neon-orange/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-orange">
                {stock.badge}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm font-semibold text-white">
            {product.stockStatus === "pre-order" ? (
              "Pre-order — not in stock yet"
            ) : (
              <>
                <span className="text-neon-orange">{stock.remaining}</span>
                <span className="text-white/50">
                  {" "}
                  of {stock.total} cards available
                </span>
              </>
            )}
          </p>
          {product.stockStatus !== "pre-order" ? (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`h-full rounded-full transition-all ${
                  product.stockStatus === "low-stock"
                    ? "bg-red-500"
                    : "bg-neon-orange"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          ) : null}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:max-w-md">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="text-xs uppercase tracking-wider text-white/45">
              Rarity
            </dt>
            <dd className="mt-1 font-semibold text-white">{product.rarity}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="text-xs uppercase tracking-wider text-white/45">
              Tier
            </dt>
            <dd className="mt-1 font-semibold text-white">{product.tier}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="text-xs uppercase tracking-wider text-white/45">
              Wave
            </dt>
            <dd className="mt-1 font-semibold text-white">{product.wave}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <dt className="text-xs uppercase tracking-wider text-white/45">
              Line
            </dt>
            <dd className="mt-1 font-semibold text-white">Kayou / premium</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-white/65">
          {product.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-3 text-sm text-white/70">
            Quantity
            <input
              type="number"
              min={1}
              max={maxQty}
              value={qty}
              onChange={(e) =>
                setQty(
                  Math.max(1, Math.min(maxQty, Number(e.target.value) || 1))
                )
              }
              className="w-20 rounded-xl border border-white/15 bg-black px-3 py-2 text-white focus:border-neon-orange focus:outline-none"
            />
          </label>
          <motion.div layout>
            <Button type="button" onClick={handleAdd}>
              {added ? "Added ✓" : "Add to cart"}
            </Button>
          </motion.div>
        </div>
        <p className="mt-6 text-xs text-white/40">
          Checkout and payments are not wired yet — cart persists locally so you
          can prototype flows before connecting Stripe or your admin panel.
        </p>
      </motion.div>
    </div>
  );
}
