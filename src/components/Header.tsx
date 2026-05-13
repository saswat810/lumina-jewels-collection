import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Shield } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { useAuth } from "@/lib/auth";

export function Header() {
  const { cartCount, setCartOpen, wishlist } = useShop();
  const { isAdmin } = useAuth();

  return (
    <>
      <div className="bg-charcoal text-bone text-[9px] uppercase tracking-luxe py-2 px-6 flex justify-between items-center">
        <span>Complimentary express shipping on orders over $500</span>
        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:text-gold transition-colors">Store Locator</a>
          <a href="#" className="hover:text-gold transition-colors">Concierge</a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-bone/90 backdrop-blur-xl border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="text-xl md:text-2xl font-serif tracking-tighter font-bold flex-shrink-0">
            L'AURORE
          </Link>

          <div className="hidden md:flex flex-1 max-w-md items-center bg-dust/30 px-4 py-2.5 border border-transparent focus-within:border-gold/40 focus-within:bg-white transition-all">
            <Search size={14} strokeWidth={1.5} className="opacity-50 mr-3" />
            <input
              type="text"
              placeholder="Search rings, earrings, solitaires..."
              className="bg-transparent text-xs focus:outline-none w-full placeholder:text-charcoal/40"
            />
          </div>

          <div className="flex items-center gap-5 md:gap-6">
            {isAdmin && (
              <Link to="/admin" aria-label="Admin" className="hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-luxe font-bold text-gold hover:opacity-80">
                <Shield size={14} strokeWidth={1.5} /> Admin
              </Link>
            )}
            <Link to="/account" aria-label="Account" className="hover:text-gold transition-colors hidden md:block">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="hover:text-gold transition-colors relative">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-3.5 bg-gold text-[8px] flex items-center justify-center rounded-full text-charcoal font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="hover:text-gold transition-colors relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-3.5 bg-gold text-[8px] flex items-center justify-center rounded-full text-charcoal font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-10 h-12 border-t border-charcoal/5 text-[10px] uppercase tracking-luxe font-bold">
          <Link to="/shop" search={{ category: undefined }} className="hover:text-gold border-b-2 border-transparent hover:border-gold py-3 transition-all">
            New In
          </Link>
          <Link to="/shop" search={{ category: "rings" }} className="hover:text-gold border-b-2 border-transparent hover:border-gold py-3 transition-all">
            Rings
          </Link>
          <Link to="/shop" search={{ category: "earrings" }} className="hover:text-gold border-b-2 border-transparent hover:border-gold py-3 transition-all">
            Earrings
          </Link>
          <Link to="/shop" search={{ category: "necklaces" }} className="hover:text-gold border-b-2 border-transparent hover:border-gold py-3 transition-all">
            Necklaces
          </Link>
          <Link to="/shop" search={{ category: "bracelets" }} className="hover:text-gold border-b-2 border-transparent hover:border-gold py-3 transition-all">
            Bracelets
          </Link>
          <Link to="/shop" search={{ category: undefined }} className="text-gold hover:opacity-80 py-3">
            Gifts
          </Link>
        </nav>
      </header>
    </>
  );
}
