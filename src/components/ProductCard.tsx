import { Link } from "@tanstack/react-router";
import { Heart, Eye, Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/format";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, qtyOf, setQty, toggleWishlist, inWishlist } = useShop();
  const qty = qtyOf(product.id);
  const wished = inWishlist(product.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block relative aspect-[4/5] bg-dust/30 mb-5 overflow-hidden outline outline-1 -outline-offset-1 outline-charcoal/5"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-bone/90 text-charcoal text-[9px] uppercase tracking-luxe font-bold px-3 py-1">
            New
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className="absolute top-4 right-4 size-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:text-gold"
        >
          <Heart size={16} className={wished ? "fill-gold text-gold" : ""} strokeWidth={1.5} />
        </button>
        <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-6 py-3 bg-white text-charcoal text-[10px] uppercase tracking-luxe font-bold shadow-elegant flex items-center gap-2">
            <Eye size={12} strokeWidth={1.5} /> Quick View
          </span>
        </div>
      </Link>
      <div className="space-y-1.5">
        <h3 className="text-[11px] uppercase tracking-luxe font-bold">{product.name}</h3>
        <p className="text-[10px] opacity-60">{product.material}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-gold font-serif text-lg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[10px] line-through opacity-30 font-serif">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <Stars rating={product.rating} />
        </div>
        <div className="pt-3">
          {qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-charcoal text-bone py-3 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between border border-charcoal/15">
              <button
                onClick={() => setQty(product.id, qty - 1)}
                aria-label="Decrease"
                className="px-4 py-3 hover:text-gold transition-colors"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="text-[11px] font-bold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(product.id, qty + 1)}
                aria-label="Increase"
                className="px-4 py-3 hover:text-gold transition-colors"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
