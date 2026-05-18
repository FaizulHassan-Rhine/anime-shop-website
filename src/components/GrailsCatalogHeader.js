"use client";

import { motion } from "framer-motion";

export default function GrailsCatalogHeader({
  eyebrow = "Featured",
  title,
  subtitle,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-orange" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon-orange">
          {eyebrow}
        </span>
      </div>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
