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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="pointer-events-auto relative mx-auto max-w-7xl overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/[0.04]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
        <Link
          href="/"
          className="shrink-0 text-base font-bold tracking-wide text-neon-orange sm:text-lg"
        >
          TCG Shop <span className="text-white/90">BD</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border border-white/10 bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white/90"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="flex items-center gap-0.5 md:hidden">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                    active
                      ? "border border-white/10 bg-white/[0.12] text-white backdrop-blur-md"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/cart"
            className="relative inline-flex shrink-0 items-center justify-center rounded-full border border-neon-orange/30 bg-neon-orange/95 px-4 py-2 text-xs font-bold text-black shadow-[0_4px_16px_rgba(212,175,55,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:bg-neon-orange sm:px-5 sm:text-sm"
          >
            Cart
            {count > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black/90 px-1 text-[9px] font-bold text-neon-orange ring-2 ring-white/20 backdrop-blur-sm"
              >
                {count > 99 ? "99+" : count}
              </motion.span>
            ) : null}
          </Link>
        </div>
        </div>
      </motion.div>
    </header>
  );
}
