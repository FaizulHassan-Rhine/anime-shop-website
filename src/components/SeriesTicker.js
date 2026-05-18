const series = [
  "Naruto Series",
  "One Piece",
  "Demon Slayer",
  "Attack on Titan",
  "Jujutsu Kaisen",
  "Dragon Ball Z",
];

function TickerRow({ items, ariaHidden = false }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((name, i) => (
        <span
          key={`${name}-${i}`}
          className="flex shrink-0 items-center gap-5 px-5 sm:gap-6 sm:px-6"
        >
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-neon-orange/90 sm:text-[11px]">
            {name}
          </span>
          <span
            className="h-1 w-1 shrink-0 rounded-full bg-neon-orange/60"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/** Repeat list so each track is always wider than the viewport */
function buildTrack(repeats = 4) {
  return Array.from({ length: repeats }, () => series).flat();
}

export default function SeriesTicker() {
  const trackItems = buildTrack();

  return (
    <div
      className="border-t border-white/[0.06] bg-black/40 py-4"
      aria-label="Featured anime series"
    >
      <div className="series-ticker-viewport overflow-hidden">
        <div className="series-ticker-track flex w-max will-change-transform">
          <TickerRow items={trackItems} />
          <TickerRow items={trackItems} ariaHidden />
        </div>
      </div>
    </div>
  );
}
