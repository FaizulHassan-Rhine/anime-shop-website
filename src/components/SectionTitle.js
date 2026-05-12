"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="font-display text-3xl font-bold text-white sm:text-4xl"
      >
        <span className="text-white">
          {title}
        </span>
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
