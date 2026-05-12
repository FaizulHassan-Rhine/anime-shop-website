import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "About — AuraCards",
  description:
    "Learn how AuraCards curates authentic anime trading cards for collectors.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Our story"
        title="Built for the binder, not the bulk aisle"
        subtitle="AuraCards is a demo storefront pattern you can extend: swap in your catalog API, plug in payments, and layer an admin panel for waves and SKUs."
      />
      <div className="prose prose-invert mt-10 max-w-none text-sm leading-relaxed text-white/70">
        <p>
          We focus on premium anime trading cards — Kayou official lines, SSR
          and MR tiers, and wave drops that collectors actually chase. Every
          listing is structured with rarity, tier, and wave metadata so you can
          grow into richer filters or importer tools without redesigning the UI.
        </p>
        <p className="mt-4">
          This project intentionally keeps business logic on the client with
          static JSON. When you are ready, replace the data module with fetch
          calls to your backend, add inventory locks at checkout, and keep the
          same components for a seamless upgrade path.
        </p>
      </div>
    </div>
  );
}
