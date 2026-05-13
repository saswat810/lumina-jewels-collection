import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Lunovelle" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

interface DBProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  price: number;
  old_price: number | null;
  image: string;
  description: string;
  stock_quantity: number;
  is_active: boolean;
  is_new: boolean;
  is_trending: boolean;
}

const EMPTY: Omit<DBProduct, "id"> = {
  slug: "",
  name: "",
  category: "rings",
  material: "",
  price: 0,
  old_price: null,
  image: "",
  description: "",
  stock_quantity: 0,
  is_active: true,
  is_new: false,
  is_trending: false,
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [editing, setEditing] = useState<DBProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<DBProduct, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setProducts((data ?? []) as DBProduct[]);
    setLoadingList(false);
  };

  useEffect(() => {
    if (isAdmin) fetchAll();
  }, [isAdmin]);

  if (loading) return <div className="py-32 text-center text-sm text-charcoal/50">Loading...</div>;
  if (!user) return <Navigate to="/account" />;
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-6 py-32 text-center">
        <Shield className="mx-auto text-gold mb-4" size={32} strokeWidth={1.5} />
        <h1 className="text-2xl font-serif">Access restricted</h1>
        <p className="text-sm text-charcoal/60 mt-2">This area is reserved for administrators.</p>
      </div>
    );
  }

  const startEdit = (p: DBProduct) => {
    setEditing(p);
    setCreating(false);
    setDraft(p);
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setDraft(EMPTY);
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
  };

  const save = async () => {
    if (!draft.name || !draft.slug) {
      toast.error("Name and slug are required");
      return;
    }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("products").update(draft).eq("id", editing.id);
      if (error) toast.error(error.message);
      else {
        toast.success("Product updated");
        cancel();
        fetchAll();
      }
    } else {
      const { error } = await supabase.from("products").insert(draft);
      if (error) toast.error(error.message);
      else {
        toast.success("Product created");
        cancel();
        fetchAll();
      }
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchAll();
    }
  };

  const showForm = creating || editing;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-[10px] uppercase tracking-luxe text-gold font-bold flex items-center gap-2">
            <Shield size={12} /> Admin
          </span>
          <h1 className="text-3xl md:text-4xl font-serif mt-2">Product Management</h1>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="bg-charcoal text-bone px-5 py-3 text-[10px] uppercase tracking-luxe font-bold hover:bg-gold hover:text-charcoal transition flex items-center gap-2"
          >
            <Plus size={14} /> New Product
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-charcoal/10 p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl">{editing ? "Edit product" : "New product"}</h2>
            <button onClick={cancel} className="text-charcoal/50 hover:text-charcoal">
              <X size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Name">
              <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>
            <Field label="Slug (url)">
              <input className={inputCls} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
            </Field>
            <Field label="Category">
              <select className={inputCls} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                <option value="rings">Rings</option>
                <option value="earrings">Earrings</option>
                <option value="necklaces">Necklaces</option>
                <option value="bracelets">Bracelets</option>
              </select>
            </Field>
            <Field label="Material">
              <input className={inputCls} value={draft.material} onChange={(e) => setDraft({ ...draft, material: e.target.value })} />
            </Field>
            <Field label="Price ($)">
              <input type="number" min={0} step="0.01" className={inputCls} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
            </Field>
            <Field label="Old price ($, optional)">
              <input type="number" min={0} step="0.01" className={inputCls} value={draft.old_price ?? ""} onChange={(e) => setDraft({ ...draft, old_price: e.target.value ? Number(e.target.value) : null })} />
            </Field>
            <Field label="Stock quantity">
              <input type="number" min={0} className={inputCls} value={draft.stock_quantity} onChange={(e) => setDraft({ ...draft, stock_quantity: Number(e.target.value) })} />
            </Field>
            <Field label="Image URL">
              <input className={inputCls} value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Description">
                <textarea rows={3} className={inputCls} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
              </Field>
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
              <Toggle label="Active" checked={draft.is_active} onChange={(v) => setDraft({ ...draft, is_active: v })} />
              <Toggle label="New" checked={draft.is_new} onChange={(v) => setDraft({ ...draft, is_new: v })} />
              <Toggle label="Trending" checked={draft.is_trending} onChange={(v) => setDraft({ ...draft, is_trending: v })} />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-charcoal/10">
            <button onClick={cancel} className="px-5 py-3 text-[10px] uppercase tracking-luxe font-bold border border-charcoal/15 hover:border-charcoal">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="bg-gold text-charcoal px-5 py-3 text-[10px] uppercase tracking-luxe font-bold hover:bg-charcoal hover:text-bone transition flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={14} /> {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-charcoal text-bone text-[10px] uppercase tracking-luxe">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-right px-4 py-3">Price</th>
              <th className="text-right px-4 py-3">Stock</th>
              <th className="text-center px-4 py-3 hidden sm:table-cell">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingList && (
              <tr><td colSpan={6} className="text-center py-12 text-charcoal/50">Loading...</td></tr>
            )}
            {!loadingList && products.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-charcoal/50">No products yet.</td></tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-t border-charcoal/5 hover:bg-dust/20">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-charcoal/50">{p.slug}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell capitalize">{p.category}</td>
                <td className="px-4 py-3 text-right">{formatPrice(Number(p.price))}</td>
                <td className={`px-4 py-3 text-right font-mono ${p.stock_quantity === 0 ? "text-red-600" : p.stock_quantity < 5 ? "text-amber-600" : ""}`}>
                  {p.stock_quantity}
                </td>
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  <span className={`text-[9px] uppercase tracking-luxe px-2 py-1 font-bold ${p.is_active ? "bg-green-100 text-green-800" : "bg-charcoal/10 text-charcoal/60"}`}>
                    {p.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => startEdit(p)} className="p-2 hover:text-gold" aria-label="Edit"><Pencil size={14} /></button>
                  <button onClick={() => remove(p.id)} className="p-2 hover:text-red-600" aria-label="Delete"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-white border border-charcoal/15 px-3 py-2.5 text-sm focus:outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-luxe text-charcoal/60 font-bold block mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-gold" />
      <span className="text-[10px] uppercase tracking-luxe font-bold">{label}</span>
    </label>
  );
}
