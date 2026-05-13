export function Footer() {
  return (
    <footer className="bg-charcoal text-bone pt-24 pb-32 md:pb-24 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="text-3xl font-serif mb-8">LUNOVELLE</div>
          <p className="text-bone/60 max-w-sm mb-8 leading-relaxed font-light">
            Crafting legacies since 1924. Every piece is a testament to the timeless pursuit of beauty and precision.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] tracking-luxe uppercase hover:text-gold transition-colors font-bold">Instagram</a>
            <a href="#" className="text-[10px] tracking-luxe uppercase hover:text-gold transition-colors font-bold">Pinterest</a>
            <a href="#" className="text-[10px] tracking-luxe uppercase hover:text-gold transition-colors font-bold">Contact</a>
          </div>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-luxe font-bold mb-8 opacity-40">Concierge</h4>
          <ul className="space-y-4 text-xs font-light">
            <li><a href="#" className="hover:text-gold">My Account</a></li>
            <li><a href="#" className="hover:text-gold">Order Status</a></li>
            <li><a href="#" className="hover:text-gold">Jewelry Care</a></li>
            <li><a href="#" className="hover:text-gold">Return Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-luxe font-bold mb-8 opacity-40">Newsletter</h4>
          <p className="text-[10px] mb-4 opacity-60">Join our inner circle for exclusive previews.</p>
          <div className="flex border-b border-bone/20 pb-2">
            <input
              type="email"
              placeholder="Enter email..."
              className="bg-transparent text-xs w-full focus:outline-none placeholder:italic placeholder:opacity-50"
            />
            <button className="text-[10px] uppercase font-bold tracking-luxe">→</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-bone/10 flex justify-between text-[9px] uppercase tracking-luxe opacity-50">
        <span>© 2026 Lunovelle Maison</span>
        <span>Paris · Florence · New York</span>
      </div>
    </footer>
  );
}
