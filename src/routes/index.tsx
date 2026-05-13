import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lunovelle — Timeless Radiance in Fine Jewellery" },
      { name: "description", content: "Hand-crafted fine jewellery since 1924. Explore the new collection of rings, earrings, necklaces and bracelets." },
    ],
  }),
  component: HomePage,
});

const TESTIMONIALS = [
  { name: "Eleanor V.", location: "London", quote: "The attention to detail in the packaging and the weight of the gold felt like a personal invitation into an older, more elegant world." },
  { name: "Sophia K.", location: "New York", quote: "My engagement ring is more luminous than I ever dreamed. Lunovelle made every step effortless and personal." },
  { name: "Camille R.", location: "Paris", quote: "Heirloom-quality craftsmanship with a genuinely modern point of view. I keep coming back." },
];

function HomePage() {
  const featured = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Diamond solitaire on gold chain"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bone/85 via-bone/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl animate-fade-up">
            <span className="text-[10px] uppercase tracking-luxe text-gold font-bold mb-5 block">
              New Collection · 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] mb-8 text-charcoal">
              Timeless<br /><i className="font-normal">Radiance</i>
            </h1>
            <p className="text-charcoal/70 mb-10 max-w-md font-light leading-relaxed">
              A curated edit of solitaires, hoops and chains — sculpted by hand from recycled 18KT gold and conflict-free stones.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                search={{ category: undefined }}
                className="px-10 py-4 bg-charcoal text-bone text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-all"
              >
                Shop the Collection
              </Link>
              <Link
                to="/shop"
                search={{ category: "rings" }}
                className="px-10 py-4 border border-charcoal text-[10px] uppercase tracking-luxe font-bold hover:bg-charcoal hover:text-bone transition-all"
              >
                Explore Solitaires
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">The Maison</span>
            <h2 className="text-4xl font-serif mt-2">Curation</h2>
          </div>
          <Link to="/shop" search={{ category: undefined }} className="text-[10px] uppercase tracking-luxe border-b border-charcoal/20 pb-1 hover:text-gold transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              search={{ category: cat.id }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-dust/30 mb-4 overflow-hidden outline outline-1 -outline-offset-1 outline-charcoal/5">
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-[11px] uppercase tracking-luxe font-bold">{cat.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-24 border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Selected by the atelier</span>
              <h2 className="text-4xl font-serif mt-2">Featured Pieces</h2>
            </div>
            <Link to="/shop" search={{ category: undefined }} className="text-[10px] uppercase tracking-luxe border-b border-charcoal/20 pb-1 hover:text-gold transition-colors">
              Shop All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Just arrived</span>
            <h2 className="text-4xl font-serif mt-2">New Arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blush/30 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">In Their Words</span>
          <h2 className="text-4xl font-serif mt-2 mb-16">Beloved by collectors</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="space-y-6">
                <div className="flex justify-center"><Stars rating={5} size={14} /></div>
                <blockquote className="font-serif italic text-lg leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="text-[10px] uppercase tracking-luxe text-charcoal/60">
                  {t.name} · {t.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
