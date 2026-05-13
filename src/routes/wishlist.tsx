import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Lunovelle" },
      { name: "description", content: "Pieces you've saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Saved for later</span>
        <h1 className="text-5xl font-serif mt-3">Your Wishlist</h1>
        <p className="text-sm text-charcoal/60 mt-3">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm text-charcoal/60 mb-6">You haven't saved any pieces yet.</p>
          <Link to="/shop" search={{ category: undefined }} className="inline-block px-10 py-4 bg-charcoal text-bone text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
