"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-orange/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-neon-orange text-black shadow-neon hover:bg-neon-orange/90",
  secondary:
    "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-neon-orange/60 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white hover:bg-white/5",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
