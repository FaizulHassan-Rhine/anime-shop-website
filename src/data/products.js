/**
 * Sample catalog — swap `image` paths after you add real card art to /public/cards/
 * (see comments on each product for suggested filenames).
 */
export const products = [
  {
    id: "kayou-itachi-mr-t4-w3",
    name: "Kayou Official Naruto Itachi MR Tier 4 Wave 3",
    anime: "Naruto",
    rarity: "MR",
    tier: "Tier 4",
    wave: "Wave 3",
    price: 189.99,
    image: "/cards/itachi.png",
    description:
      "Premium Kayou official holographic Itachi card from Wave 3. MR finish with deep crimson foil and sharp edge alignment — a centerpiece for any Naruto collector.",
    stockStatus: "in-stock",
  },
  {
    id: "naruto-ssr-kayou",
    name: "Naruto SSR Kayou Official Card",
    anime: "Naruto",
    rarity: "SSR",
    tier: "Tier 2",
    wave: "Wave 1",
    price: 64.5,
    image: "/cards/naruto-ssr.png",
    description:
      "High-grade SSR Naruto with Kayou official seal. Balanced holo burst and clean corners — ideal for display or grading prep.",
    stockStatus: "in-stock",
  },
  {
    id: "sasuke-mr-rare",
    name: "Sasuke MR Rare Card",
    anime: "Naruto",
    rarity: "MR",
    tier: "Tier 3",
    wave: "Wave 2",
    price: 142.0,
    image: "/cards/sasuke-mr.png",
    description:
      "Rare MR Sasuke with electric violet accents. Limited circulation from Wave 2 — strong demand among Uchiha collectors.",
    stockStatus: "low-stock",
  },
  {
    id: "luffy-gear5-premium",
    name: "Luffy Gear 5 Premium Card",
    anime: "One Piece",
    rarity: "Premium",
    tier: "Tier 5",
    wave: "Wave 1",
    price: 225.0,
    image: "/cards/luffy-gear5.png",
    description:
      "Sun God era premium treatment: layered foil, embossed clouds, and Gear 5 lightning motifs. A flagship One Piece pickup.",
    stockStatus: "in-stock",
  },
  {
    id: "zoro-ssr-onepiece",
    name: "Zoro SSR One Piece Card",
    anime: "One Piece",
    rarity: "SSR",
    tier: "Tier 2",
    wave: "Wave 4",
    price: 58.99,
    image: "/cards/zoro-ssr.png",
    description:
      "SSR Zoro with emerald holo banding and three-sword stance ink detail. Clean surface, collector-ready.",
    stockStatus: "in-stock",
  },
  {
    id: "gojo-satoru-rare",
    name: "Gojo Satoru Rare Anime Card",
    anime: "Jujutsu Kaisen",
    rarity: "Rare",
    tier: "Tier 3",
    wave: "Wave 1",
    price: 119.0,
    image: "/cards/gojo-rare.png",
    description:
      "Rare Gojo with infinity motif glass effect, white highlights, and premium matte borders.",
    stockStatus: "pre-order",
  },
];

export const categories = [
  "Naruto",
  "One Piece",
  "Jujutsu Kaisen",
  "Pokémon",
  "Yu-Gi-Oh!",
  "FIFA",
];

export const rarities = [
  "SR",
  "SSR",
  "UR",
  "AR",
  "OR",
  "PU",
  "MR",
  "SP",
  "Rare",
  "Premium",
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}
