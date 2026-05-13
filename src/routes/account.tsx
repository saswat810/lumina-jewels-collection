import { createFileRoute } from "@tanstack/react-router";
import { User, Package, Heart, LogIn } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — L'Aurore" },
      { name: "description", content: "Sign in to your L'Aurore account." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <div className="size-16 rounded-full bg-gold/15 mx-auto mb-6 flex items-center justify-center">
          <User size={24} className="text-gold" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Welcome</span>
        <h1 className="text-4xl font-serif mt-3">Sign in</h1>
        <p className="text-sm text-charcoal/60 mt-3">Access your orders, wishlist and concierge.</p>
      </div>

      <form className="space-y-4">
        <input type="email" required placeholder="Email" className="w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        <input type="password" required placeholder="Password" className="w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        <button type="submit" className="w-full bg-charcoal text-bone py-4 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center gap-2">
          <LogIn size={14} strokeWidth={1.5} /> Sign In
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-luxe text-charcoal/40">
        <span className="flex-1 h-px bg-charcoal/10" /> or <span className="flex-1 h-px bg-charcoal/10" />
      </div>

      <button className="w-full border border-charcoal/15 py-4 text-[10px] uppercase tracking-luxe font-bold hover:border-gold hover:text-gold transition-colors">
        Continue with Google
      </button>

      <p className="text-center text-xs text-charcoal/60 mt-8">
        New to L'Aurore? <a href="#" className="text-gold border-b border-gold/40">Create an account</a>
      </p>

      <div className="mt-16 pt-8 border-t border-charcoal/10 grid grid-cols-2 gap-4 text-center">
        <div className="p-4">
          <Package size={18} className="mx-auto text-gold mb-2" strokeWidth={1.5} />
          <p className="text-[10px] uppercase tracking-luxe font-bold">Order History</p>
        </div>
        <div className="p-4">
          <Heart size={18} className="mx-auto text-gold mb-2" strokeWidth={1.5} />
          <p className="text-[10px] uppercase tracking-luxe font-bold">Saved Pieces</p>
        </div>
      </div>

      <p className="mt-10 text-center text-[10px] uppercase tracking-luxe text-charcoal/40">
        Authentication is a UI preview. Connect Lovable Cloud to enable sign-in.
      </p>
    </div>
  );
}
