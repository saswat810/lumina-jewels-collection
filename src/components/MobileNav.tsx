import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react";
import { useShop } from "@/lib/shop-store";

export function MobileNav() {
  const { wishlist, cartCount, setCartOpen } = useShop();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const item = (active: boolean) =>
    `flex flex-col items-center gap-1 ${active ? "text-gold" : "text-charcoal/60"}`;

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-t border-charcoal/5 flex items-center justify-around md:hidden z-40">
      <Link to="/" className={item(path === "/")}>
        <Home size={18} strokeWidth={1.5} />
        <span className="text-[8px] uppercase font-bold tracking-luxe">Home</span>
      </Link>
      <Link to="/shop" search={{ category: undefined }} className={item(path === "/shop")}>
        <Search size={18} strokeWidth={1.5} />
        <span className="text-[8px] uppercase font-bold tracking-luxe">Shop</span>
      </Link>
      <button onClick={() => setCartOpen(true)} className={item(false) + " relative"}>
        <ShoppingBag size={18} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 size-3 bg-gold rounded-full text-[7px] font-bold text-charcoal flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[8px] uppercase font-bold tracking-luxe">Bag</span>
      </button>
      <Link to="/wishlist" className={item(path === "/wishlist") + " relative"}>
        <Heart size={18} strokeWidth={1.5} />
        {wishlist.length > 0 && <span className="absolute top-0 right-2 size-2 bg-gold rounded-full" />}
        <span className="text-[8px] uppercase font-bold tracking-luxe">Wish</span>
      </Link>
      <Link to="/account" className={item(path === "/account")}>
        <User size={18} strokeWidth={1.5} />
        <span className="text-[8px] uppercase font-bold tracking-luxe">Account</span>
      </Link>
    </nav>
  );
}
