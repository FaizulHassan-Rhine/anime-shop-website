const glowCycle = ["orange", "purple", "red", "blue"];

export function getGlowForIndex(index) {
  return glowCycle[index % glowCycle.length];
}

export function getStockMeta(product, index = 0) {
  if (product.stockStatus === "low-stock") {
    return {
      remaining: 3,
      total: 10,
      badge: "Only 3 left",
      originalPrice: null,
    };
  }
  if (product.stockStatus === "pre-order") {
    return {
      remaining: 0,
      total: 50,
      badge: "Pre-order",
      originalPrice: null,
    };
  }
  if (index === 0) {
    return {
      remaining: 24,
      total: 30,
      badge: "New drop",
      originalPrice: null,
    };
  }
  if (index === 1) {
    return {
      remaining: 18,
      total: 25,
      badge: null,
      originalPrice: 79.99,
    };
  }

  const seed = product.id.length + index;
  const total = 20 + (seed % 15);
  const remaining = Math.max(4, total - (seed % 12));

  return {
    remaining,
    total,
    badge: null,
    originalPrice: null,
  };
}
