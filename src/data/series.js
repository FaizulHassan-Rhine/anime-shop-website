export const allSeries = [
  {
    name: "Naruto",
    tagline: "Ninja & Kayou drops",
    image: "/images/product/naruto.jpg",
    border: "group-hover:border-orange-500/40",
  },
  {
    name: "One Piece",
    tagline: "Pirates & premium pulls",
    image: "/images/product/one-piece.jpg",
    border: "group-hover:border-red-500/40",
  },
  {
    name: "Yu-Gi-Oh!",
    tagline: "Duel monsters & rares",
    image: "/images/product/yu-gi-oh.webp",
    border: "group-hover:border-indigo-500/40",
  },
  {
    name: "Pokémon",
    tagline: "TCG packs & holo pulls",
    image: "/images/product/pokemon.jpg",
    border: "group-hover:border-yellow-500/40",
  },
  {
    name: "FIFA",
    tagline: "Football cards & collections",
    image: "/images/product/fifa.jpg",
    border: "group-hover:border-emerald-500/40",
  },
  {
    name: "Jujutsu Kaisen",
    tagline: "Sorcerers & rare holos",
    image: "/images/product/jujutsu.webp",
    border: "group-hover:border-violet-500/40",
  },
];

/** Home page — first 5 in display order */
export const featuredSeriesNames = [
  "Naruto",
  "One Piece",
  "Yu-Gi-Oh!",
  "Pokémon",
  "FIFA",
];

export function getFeaturedSeries() {
  return featuredSeriesNames
    .map((name) => allSeries.find((s) => s.name === name))
    .filter(Boolean);
}
