import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, products } from "@/data/products";
import CardDetailClient from "./CardDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function CardDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-xs text-white/45">
        <Link href="/shop" className="hover:text-white">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/70">{product.name}</span>
      </nav>
      <CardDetailClient product={product} />
    </div>
  );
}
