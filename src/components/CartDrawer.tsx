import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useShop } from "@/lib/shop-store";
import { formatPrice } from "@/lib/format";
import { useEffect } from "react";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, cartTotal } = useShop();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-charcoal/40 animate-fade-in"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-bone shadow-elegant flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
          <h2 className="text-lg font-serif">Your Selection</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close" className="p-1 hover:text-gold">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-sm text-charcoal/60">
              <p className="mb-4 text-[11px] uppercase tracking-luxe font-bold">Your bag is empty</p>
              <p className="font-light">Discover our latest pieces.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 pb-6 border-b border-charcoal/5">
                  <img src={product.image} alt={product.name} className="w-20 h-24 object-cover bg-dust/30" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2 mb-1">
                      <h3 className="text-[11px] uppercase tracking-luxe font-bold">{product.name}</h3>
                      <button onClick={() => removeFromCart(product.id)} aria-label="Remove" className="opacity-50 hover:text-gold hover:opacity-100">
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-[10px] opacity-60 mb-3">{product.material}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-charcoal/15">
                        <button onClick={() => setQty(product.id, quantity - 1)} className="px-3 py-1 hover:text-gold">
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="text-[11px] font-bold tabular-nums px-3">{quantity}</span>
                        <button onClick={() => setQty(product.id, quantity + 1)} className="px-3 py-1 hover:text-gold">
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-gold font-serif">{formatPrice(product.price * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-charcoal/10 px-6 py-6 space-y-4 bg-white/50">
            <div className="flex justify-between text-sm">
              <span className="opacity-60">Subtotal</span>
              <span className="font-serif text-xl text-gold">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[10px] opacity-50 uppercase tracking-luxe">Tax & shipping calculated at checkout</p>
            <button className="w-full bg-charcoal text-bone py-4 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
