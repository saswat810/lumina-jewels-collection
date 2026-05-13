import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  category: z.enum(["rings", "earrings", "necklaces", "bracelets"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop Fine Jewellery — L'Aurore" },
      { name: "description", content: "Browse our full collection of rings, earrings, necklaces and bracelets in 18KT gold and ethical stones." },
    ],
  }),
  component: ShopPage,
});

type Sort = "popularity" | "newest" | "low" | "high";

function ShopPage() {
  const { category } = Route.useSearch();
  const [sort, setSort] = useState<Sort>("popularity");
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => (category ? p.category === category : true));
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "low": list = [...list].sort((a, b) => a.price - b.price); break;
      case "high": list = [...list].sort((a, b) => b.price - a.price); break;
      case "newest": list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      default: list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [category, sort, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10 animate-fade-up">
        <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">The Boutique</span>
        <h1 className="text-5xl font-serif mt-3">{category ? CATEGORIES.find((c) => c.id === category)?.label : "All Jewellery"}</h1>
        <p className="text-sm text-charcoal/60 mt-3">{products.length} pieces</p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <CategoryPill active={!category}>All</CategoryPill>
        {CATEGORIES.map((c) => (
          <CategoryPill key={c.id} active={category === c.id} cat={c.id}>{c.label}</CategoryPill>
        ))}
      </div>

      {/* Filter bar */}
      <div className="sticky top-32 z-20 bg-bone/95 backdrop-blur-sm py-4 border-y border-charcoal/10 flex flex-wrap items-center justify-between gap-4 mb-12">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[10px] uppercase tracking-luxe font-bold">Filter:</span>
          <label className="flex items-center gap-3 text-[10px] uppercase tracking-luxe">
            Price ≤ ${maxPrice.toLocaleString()}
            <input
              type="range"
              min={500}
              max={10000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-gold w-32"
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-luxe font-bold opacity-60">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-transparent text-[10px] uppercase tracking-luxe font-bold focus:outline-none cursor-pointer"
          >
            <option value="popularity">Popularity</option>
            <option value="newest">Newest First</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-center py-20 text-sm text-charcoal/60">No pieces match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

function CategoryPill({ active, cat, children }: { active: boolean; cat?: Category; children: React.ReactNode }) {
  return (
    <Link
      to="/shop"
      search={{ category: cat }}
      className={`px-5 py-2 text-[10px] uppercase tracking-luxe font-bold border transition-colors ${
        active ? "bg-charcoal text-bone border-charcoal" : "border-charcoal/15 hover:border-gold"
      }`}
    >
      {children}
    </Link>
  );
}
