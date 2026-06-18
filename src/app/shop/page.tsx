'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { fetchProducts, formatPrice, checkout, type Product, type CartItem } from '@/lib/checkout';

// ── Botanical SVG placeholder ──────────────────────────────────────────────────
function ProductSvg() {
  return (
    <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-32" aria-hidden="true">
      <line x1="100" y1="250" x2="100" y2="30" stroke="#b5704a" strokeWidth="1.2" />
      <circle cx="100" cy="28" r="16" stroke="#b5704a" strokeWidth="1" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1={100 + Math.cos(r) * 12} y1={28 + Math.sin(r) * 12} x2={100 + Math.cos(r) * 22} y2={28 + Math.sin(r) * 22} stroke="#b5704a" strokeWidth="0.9" />
        );
      })}
      <path d="M100 100 Q76 88 62 65" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M62 65 Q50 53 58 40 Q72 52 62 65Z" stroke="#7a6a58" strokeWidth="0.8" fill="#f2ece2" />
      <path d="M100 140 Q126 128 140 108" stroke="#7a6a58" strokeWidth="1" fill="none" />
      <path d="M140 108 Q152 95 144 82 Q130 94 140 108Z" stroke="#7a6a58" strokeWidth="0.8" fill="#f2ece2" />
      <circle cx="62" cy="180" r="7" stroke="#b5704a" strokeWidth="0.9" fill="none" />
      <path d="M100 165 Q80 168 62 180" stroke="#7a6a58" strokeWidth="0.9" fill="none" />
      <circle cx="62" cy="180" r="3.5" stroke="#b5704a" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full"
      >
        {/* Image area */}
        <div className="bg-surface rounded-brand aspect-[4/5] flex items-center justify-center mb-5 border border-border group-hover:border-accent-soft transition-colors overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <ProductSvg />
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col px-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-fg text-xl">{product.name}</h3>
            <span className="text-accent font-semibold text-sm ml-3 whitespace-nowrap">
              {formatPrice(product.price_cents, product.currency)}
            </span>
          </div>
          <p className="text-fg-muted text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {product.description}
          </p>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
              added
                ? 'bg-green-700 text-white'
                : 'bg-accent text-white hover:bg-accent-dark'
            }`}
          >
            {added ? '✓ Added to cart' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
}

// ── Cart sidebar ───────────────────────────────────────────────────────────────
function CartSidebar({
  cart,
  products,
  open,
  onClose,
  onRemove,
  onUpdate,
  onCheckout,
}: {
  cart: CartItem[];
  products: Product[];
  open: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, qty: number) => void;
  onCheckout: () => void;
}) {
  const cartProducts = cart.map((item) => {
    const product = products.find((p) => p.product_id === item.product_id);
    return { ...item, product };
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.product_id === item.product_id);
    return sum + (product ? product.price_cents * item.quantity : 0);
  }, 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-fg/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-bg z-50 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-lg text-fg">Your Cart</h2>
          <button onClick={onClose} className="text-fg-muted hover:text-fg transition-colors text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-fg-muted text-lg italic mb-4">Your cart is empty.</p>
              <button onClick={onClose} className="text-accent text-sm hover:text-accent-dark transition-colors">
                Continue browsing →
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartProducts.map(({ product_id, quantity, product }) => (
                <li key={product_id} className="flex items-start gap-4 pb-6 border-b border-border last:border-0">
                  <div className="w-14 h-14 bg-surface rounded-lg border border-border flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 50" width="28" height="35" fill="none" aria-hidden="true">
                      <line x1="20" y1="48" x2="20" y2="8" stroke="#b5704a" strokeWidth="1" />
                      <circle cx="20" cy="7" r="6" stroke="#b5704a" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-fg text-base mb-0.5 truncate">{product?.name ?? product_id}</p>
                    <p className="text-fg-muted text-xs mb-3">
                      {product ? formatPrice(product.price_cents, product.currency) : ''}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-full overflow-hidden">
                        <button
                          onClick={() => quantity > 1 ? onUpdate(product_id, quantity - 1) : onRemove(product_id)}
                          className="w-7 h-7 flex items-center justify-center text-fg-muted hover:text-fg text-sm transition-colors"
                        >
                          −
                        </button>
                        <span className="text-fg text-sm w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdate(product_id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-fg-muted hover:text-fg text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(product_id)}
                        className="text-xs text-fg-muted hover:text-fg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {product && (
                    <p className="text-fg font-medium text-sm whitespace-nowrap">
                      {formatPrice(product.price_cents * quantity, product.currency)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-fg-muted text-sm">Total</span>
              <span className="font-serif text-fg text-xl">
                {formatPrice(total, 'EUR')}
              </span>
            </div>
            <p className="text-xs text-fg-muted mb-4">Free EU shipping · 2–4 business days</p>
            <motion.button
              onClick={onCheckout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-fg text-white py-3.5 rounded-full font-semibold text-sm hover:bg-accent-dark transition-colors"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetchProducts().then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.product_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product_id: product.product_id, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (product_id: string) => {
    setCart((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const updateQty = (product_id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(product_id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product_id === product_id ? { ...i, quantity: qty } : i))
    );
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckingOut(true);
    await checkout(cart);
    setCheckingOut(false);
  };

  return (
    <>
      <div className="min-h-screen bg-bg pt-16">
        {/* Header */}
        <div className="bg-bg border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-16 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">
                All Arrangements
              </p>
              <h1
                className="font-serif text-fg leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                The Collection
              </h1>
              <p className="text-fg-muted mt-4 max-w-lg text-base leading-relaxed">
                Each piece is composed by hand. Dried to permanence. Built to be looked at for years.
              </p>
            </div>
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
            >
              Cart
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-5 h-5 bg-accent text-white text-xs rounded-full font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-surface rounded-brand aspect-[4/5] mb-5" />
                  <div className="h-5 bg-surface rounded w-3/4 mb-3" />
                  <div className="h-4 bg-surface rounded w-full mb-2" />
                  <div className="h-4 bg-surface rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-32 text-center">
              <div className="flex justify-center mb-8">
                <ProductSvg />
              </div>
              <h2 className="font-serif text-fg text-2xl mb-3">Collection coming soon</h2>
              <p className="text-fg-muted mb-8">
                Our next arrangements are being carefully composed. Check back soon.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:text-accent-dark transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  index={i}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating cart bar when items present */}
        {cartCount > 0 && !cartOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            <motion.button
              onClick={() => setCartOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-fg text-white pl-5 pr-6 py-3.5 rounded-full text-sm font-semibold shadow-xl"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-accent rounded-full text-xs font-bold">
                {cartCount}
              </span>
              View Cart
              {checkingOut && <span className="text-white/60 text-xs">Processing…</span>}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        products={products}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdate={updateQty}
        onCheckout={handleCheckout}
      />
    </>
  );
}
