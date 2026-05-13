import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Plus, Minus, Truck, Shield, Sparkles } from "lucide-react";
import { getProduct, PRODUCTS, type Product, type Review } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — L'Aurore` },
          { name: "description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.product.name} — L'Aurore` },
          { property: "og:description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-md mx-auto py-32 text-center">
      <h1 className="text-4xl font-serif mb-4">Not found</h1>
      <Link to="/shop" search={{ category: undefined }} className="text-gold underline">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, qtyOf, setQty, toggleWishlist, inWishlist, setCartOpen } = useShop();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | undefined>(product.sizes?.[1]);
  const [reviews, setReviews] = useState<Review[]>(product.reviews);
  const [zoom, setZoom] = useState(false);

  const qty = qtyOf(product.id);
  const wished = inWishlist(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product);
    setCartOpen(true);
  };

  const submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newReview: Review = {
      id: `r-${Date.now()}`,
      user: String(fd.get("name") || "Anonymous").slice(0, 60),
      rating: Number(fd.get("rating") || 5),
      comment: String(fd.get("comment") || "").slice(0, 500),
      date: "just now",
    };
    if (!newReview.comment) return;
    setReviews((r) => [newReview, ...r]);
    e.currentTarget.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-[10px] uppercase tracking-luxe text-charcoal/50 mb-8">
        <Link to="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-gold capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div
            className="relative aspect-square bg-dust/30 overflow-hidden cursor-zoom-in outline outline-1 -outline-offset-1 outline-charcoal/5"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? "scale-150" : ""}`}
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-dust/30 ${i === activeImg ? "outline outline-2 outline-gold" : "outline outline-1 outline-charcoal/10"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:py-4">
          <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">{product.material}</span>
          <h1 className="text-4xl md:text-5xl font-serif mt-3 mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <Stars rating={product.rating} size={14} />
            <span className="text-xs text-charcoal/60">{product.rating} · {reviews.length} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-serif text-gold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm line-through opacity-40 font-serif">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <p className="text-charcoal/75 leading-relaxed mb-8 font-light">{product.description}</p>

          {product.sizes && (
            <div className="mb-8">
              <label className="text-[10px] uppercase tracking-luxe font-bold block mb-3">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`size-12 border text-sm flex items-center justify-center transition-colors ${
                      size === s ? "border-charcoal bg-charcoal text-bone" : "border-charcoal/15 hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-charcoal/70 mb-8">
            <span className={`size-2 rounded-full ${product.inStock ? "bg-green-600" : "bg-red-500"}`} />
            {product.inStock ? "In stock — ships in 2 business days" : "Out of stock"}
          </div>

          <div className="flex gap-3 mb-6">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex-1 bg-charcoal text-bone py-5 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors"
              >
                Add to Cart — {formatPrice(product.price)}
              </button>
            ) : (
              <>
                <div className="flex items-center border border-charcoal/15">
                  <button onClick={() => setQty(product.id, qty - 1)} className="px-4 py-5 hover:text-gold"><Minus size={14} /></button>
                  <span className="text-[11px] font-bold tabular-nums px-4">{qty}</span>
                  <button onClick={() => setQty(product.id, qty + 1)} className="px-4 py-5 hover:text-gold"><Plus size={14} /></button>
                </div>
                <button
                  onClick={() => setCartOpen(true)}
                  className="flex-1 bg-charcoal text-bone py-5 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors"
                >
                  View Cart
                </button>
              </>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="border border-charcoal/15 px-5 hover:border-gold hover:text-gold transition-colors"
            >
              <Heart size={18} className={wished ? "fill-gold text-gold" : ""} strokeWidth={1.5} />
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-charcoal/10 text-[10px] uppercase tracking-luxe">
            <div className="flex flex-col items-center gap-2 text-center"><Truck size={16} className="text-gold" /> Free Shipping</div>
            <div className="flex flex-col items-center gap-2 text-center"><Shield size={16} className="text-gold" /> Lifetime Warranty</div>
            <div className="flex flex-col items-center gap-2 text-center"><Sparkles size={16} className="text-gold" /> Ethically Sourced</div>
          </div>

          {/* Details */}
          <details className="mt-10 border-t border-charcoal/10 pt-6" open>
            <summary className="text-[10px] uppercase tracking-luxe font-bold cursor-pointer">Specifications</summary>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70 font-light">
              {product.details.map((d) => <li key={d} className="flex gap-3"><span className="text-gold">·</span> {d}</li>)}
            </ul>
          </details>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24 pt-16 border-t border-charcoal/10">
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Voices</span>
            <h2 className="text-3xl font-serif mt-2 mb-6">Customer Reviews</h2>
            <div className="flex items-center gap-3 mb-2">
              <Stars rating={product.rating} size={16} />
              <span className="text-2xl font-serif">{product.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-charcoal/60 mb-8">Based on {reviews.length} reviews</p>

            <form onSubmit={submitReview} className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-luxe font-bold">Share your experience</h3>
              <input name="name" required maxLength={60} placeholder="Your name" className="w-full bg-white border border-charcoal/10 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <select name="rating" defaultValue="5" className="w-full bg-white border border-charcoal/10 px-4 py-3 text-sm focus:outline-none focus:border-gold">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
              </select>
              <textarea name="comment" required maxLength={500} rows={4} placeholder="Your review..." className="w-full bg-white border border-charcoal/10 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              <button type="submit" className="w-full bg-charcoal text-bone py-3 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors">
                Submit Review
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-8">
            {reviews.length === 0 ? (
              <p className="text-sm text-charcoal/60 italic">Be the first to share your thoughts.</p>
            ) : (
              reviews.map((r) => (
                <article key={r.id} className="border-b border-charcoal/10 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[11px] uppercase tracking-luxe font-bold">{r.user}</h4>
                    <span className="text-[10px] text-charcoal/50">{r.date}</span>
                  </div>
                  <Stars rating={r.rating} />
                  <p className="mt-3 text-sm font-light leading-relaxed text-charcoal/80">{r.comment}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-charcoal/10">
          <h2 className="text-3xl font-serif mb-12">You may also love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
