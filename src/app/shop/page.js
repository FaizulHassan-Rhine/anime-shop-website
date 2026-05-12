import { Suspense } from "react";
import ShopClient from "./ShopClient";

function ShopFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center text-white/50 sm:px-6">
      Loading shop…
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopClient />
    </Suspense>
  );
}
