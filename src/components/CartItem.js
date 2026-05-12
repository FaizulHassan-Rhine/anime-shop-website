"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { setQuantity, removeLine } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
    >
      <Link
        href={`/cards/${item.id}`}
        className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-black ring-1 ring-white/10"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/cards/${item.id}`}
          className="line-clamp-2 font-semibold text-white hover:text-neon-orange"
        >
          {item.name}
        </Link>
        <p className="mt-1 text-xs text-white/45">
          {item.anime} · {item.rarity}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-white/55">
            Qty
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                setQuantity(item.id, Number(e.target.value))
              }
              className="w-16 rounded-lg border border-white/15 bg-black px-2 py-1 text-sm text-white focus:border-neon-orange focus:outline-none"
            />
          </label>
          <p className="text-sm font-bold text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            type="button"
            onClick={() => removeLine(item.id)}
            className="ml-auto text-xs font-semibold text-neon-orange hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}
