"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";

function stockLabel(status) {
  switch (status) {
    case "low-stock":
      return { text: "Low stock", className: "bg-neon-orange/20 text-neon-orange" };
    case "pre-order":
      return { text: "Pre-order", className: "bg-neon-orange/20 text-neon-orange" };
    default:
      return { text: "In stock", className: "bg-emerald-500/15 text-emerald-300" };
  }
}

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const ref = useRef(null);
  const addResetRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  function onMove(e) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const stock = stockLabel(product.stockStatus);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <Link href={`/cards/${product.id}`} className="block">
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-glass p-3 shadow-card backdrop-blur-xl transition-[box-shadow] duration-300 group-hover:border-neon-orange/50 group-hover:shadow-neon"
        >
          <div className="pointer-events-none absolute inset-0 bg-neon-orange/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
            {/* Replace image: place your PNG at public{product.image} */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 280px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              <span className="rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/90 backdrop-blur">
                {product.anime}
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur ${stock.className}`}
              >
                {stock.text}
              </span>
            </div>
          </div>

          <div className="relative mt-3 space-y-2 px-1">
            <p className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-white">
              {product.name}
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
              <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                {product.rarity}
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                {product.tier}
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">
                {product.wave}
              </span>
            </div>
            <div className="flex items-end justify-between pt-1.5">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Price
                </span>
                <p className="font-display text-xl font-bold leading-none text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <motion.span
                layout
                className="translate-x-1 text-xs font-semibold text-neon-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              >
                View →
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>

      <motion.button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product.id, 1);
          setJustAdded(true);
          if (addResetRef.current) window.clearTimeout(addResetRef.current);
          addResetRef.current = window.setTimeout(
            () => setJustAdded(false),
            900
          );
        }}
        whileTap={{ scale: 0.96 }}
        animate={justAdded ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 0.35 }}
        className={`group/btn relative mt-3 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide text-black shadow-[0_10px_30px_-12px_rgba(251,146,60,0.8)] ring-1 ring-white/15 transition-all duration-300 hover:shadow-[0_14px_36px_-10px_rgba(251,146,60,0.8)] hover:ring-white/25 ${
          justAdded
            ? "bg-emerald-400"
            : "bg-neon-orange"
        }`}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
        <span className="relative flex items-center gap-2">
          {justAdded ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <BagIcon className="h-4 w-4" />
          )}
          {justAdded ? "Added to cart" : "Add to cart"}
        </span>
      </motion.button>
    </motion.article>
  );
}

function BagIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" />
      <path d="M9 7a3 3 0 1 1 6 0" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
