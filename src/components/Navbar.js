"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-orange text-base font-black text-black shadow-neon sm:h-9 sm:w-9 sm:text-lg">
            A
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            Aura<span className="text-neon-orange">Cards</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative flex h-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 text-xs font-semibold text-white backdrop-blur transition hover:border-neon-orange/60 hover:bg-white/10 sm:h-10 sm:px-4 sm:text-sm"
          >
            Cart
            {count > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon-orange px-1 text-[10px] font-bold text-black"
              >
                {count > 99 ? "99+" : count}
              </motion.span>
            ) : null}
          </Link>
        </div>
      </div>
      <nav className="border-t border-white/5 md:hidden">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 sm:px-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
