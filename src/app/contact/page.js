"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Contact"
        title="Talk waves, tiers, or wholesale"
        subtitle="This form is front-end only — wire it to your API route or form provider when you go live."
      />

      {sent ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
        >
          Thanks — in production this would POST to your server. Reset the demo
          by refreshing the page.
        </motion.p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Name
            </label>
            <input
              required
              className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-neon-orange focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-neon-orange focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Message
            </label>
            <textarea
              required
              rows={4}
              className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-neon-orange focus:outline-none"
            />
          </div>
          <Button type="submit">Send message</Button>
        </form>
      )}
    </div>
  );
}
