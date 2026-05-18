"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MESSENGER_URL, WHATSAPP_URL } from "@/lib/contact";

export default function CheckoutContactModal({ open, onClose, total }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-contact-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Close dialog"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-orange">
              Checkout
            </p>
            <h2
              id="checkout-contact-title"
              className="mt-2 pr-8 text-xl font-bold text-white sm:text-2xl"
            >
              Contact us to complete your order
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Online payment is not available yet. Message us on WhatsApp or
              Messenger with your cart items
              {typeof total === "number" ? (
                <>
                  {" "}
                  (total{" "}
                  <span className="font-semibold text-white">
                    ${total.toFixed(2)}
                  </span>
                  )
                </>
              ) : null}{" "}
              and we will confirm availability and delivery.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#20ba57]"
              >
                <WhatsAppIcon />
                WhatsApp
              </Link>
              <Link
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0084FF] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0076e4]"
              >
                <MessengerIcon />
                Messenger
              </Link>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Continue shopping
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.48 2 2 6.03 2 10.89c0 2.79 1.41 5.27 3.61 6.88L4 22l4.45-2.33A10.87 10.87 0 0012 21.78c5.52 0 10-4.03 10-8.89S17.52 2 12 2zm.55 11.96-2.82-3.01-5.51 3.01 6.06-6.45 2.89 3.01 5.42-3.01-6.04 6.45z" />
    </svg>
  );
}
