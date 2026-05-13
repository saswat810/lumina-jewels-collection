import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User, Package, Heart, LogIn, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Lunovelle" },
      { name: "description", content: "Sign in to your Lunovelle account." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, isAdmin, signIn, signUp, signOut, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <div className="max-w-md mx-auto px-6 py-32 text-center text-charcoal/50 text-sm">Loading...</div>;
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="size-16 rounded-full bg-gold/15 mx-auto mb-6 flex items-center justify-center">
            <User size={24} className="text-gold" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Welcome back</span>
          <h1 className="text-3xl font-serif mt-3 break-all">{user.email}</h1>
          {isAdmin && (
            <span className="inline-flex items-center gap-1.5 mt-4 text-[10px] uppercase tracking-luxe bg-gold/15 text-gold px-3 py-1 font-bold">
              <Shield size={12} /> Administrator
            </span>
          )}
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="block w-full bg-gold text-charcoal py-4 text-[10px] uppercase tracking-luxe font-bold text-center hover:bg-gold/90 transition mb-3"
          >
            Open Admin Dashboard
          </Link>
        )}

        <button
          onClick={async () => {
            await signOut();
            toast.success("Signed out");
            navigate({ to: "/" });
          }}
          className="w-full border border-charcoal/15 py-4 text-[10px] uppercase tracking-luxe font-bold hover:border-gold hover:text-gold transition flex items-center justify-center gap-2"
        >
          <LogOut size={14} strokeWidth={1.5} /> Sign Out
        </button>

        <div className="mt-16 pt-8 border-t border-charcoal/10 grid grid-cols-2 gap-4 text-center">
          <div className="p-4">
            <Package size={18} className="mx-auto text-gold mb-2" strokeWidth={1.5} />
            <p className="text-[10px] uppercase tracking-luxe font-bold">Order History</p>
          </div>
          <Link to="/wishlist" className="p-4">
            <Heart size={18} className="mx-auto text-gold mb-2" strokeWidth={1.5} />
            <p className="text-[10px] uppercase tracking-luxe font-bold">Saved Pieces</p>
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success(mode === "signin" ? "Welcome back" : "Account created — check your email to verify");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <div className="size-16 rounded-full bg-gold/15 mx-auto mb-6 flex items-center justify-center">
          <User size={24} className="text-gold" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] uppercase tracking-luxe text-gold font-bold">Welcome</span>
        <h1 className="text-4xl font-serif mt-3">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="text-sm text-charcoal/60 mt-3">Access your orders, wishlist and concierge.</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 chars)"
          className="w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-charcoal text-bone py-4 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <LogIn size={14} strokeWidth={1.5} /> {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-charcoal/60 mt-8">
        {mode === "signin" ? "New to Lunovelle? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-gold border-b border-gold/40"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
