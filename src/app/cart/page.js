"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

export default function CartPage() {
  const { items, total, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-white/50">
        Loading cart…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-white">Your cart</h1>
      <p className="mt-2 text-sm text-white/55">
        Quantities sync to{" "}
        <code className="rounded bg-white/10 px-1 text-xs">localStorage</code>{" "}
        — swap for server sessions when you add accounts.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <p className="text-white/65">Your cart is empty.</p>
          <Button href="/shop" className="mt-6">
            Continue shopping
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-white/45">
              Checkout is a placeholder — connect Stripe / PayPal here later.
            </p>
            <Button type="button" className="w-full sm:w-auto" variant="secondary">
              Checkout (coming soon)
            </Button>
            <Link
              href="/shop"
              className="text-center text-sm font-semibold text-neon-orange hover:underline"
            >
              Add more cards
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
}
