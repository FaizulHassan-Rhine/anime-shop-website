import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-white">
        This card is not in the binder
      </h1>
      <p className="mt-3 text-sm text-white/60">
        The page or card you wanted does not exist in this demo catalog.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/shop" variant="secondary">
          Browse shop
        </Button>
      </div>
    </div>
  );
}
