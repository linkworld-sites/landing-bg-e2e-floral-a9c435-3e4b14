'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { formatPrice, checkout, type Product, type CartItem } from '@/lib/checkout';
import { track } from '@/lib/funnel';

function BotanicalMark() {
  return (
    <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-24 opacity-40" aria-hidden="true">
      <line x1="60" y1="175" x2="60" y2="20" stroke="#C4A882" strokeWidth="1" />
      <ellipse cx="60" cy="18" rx="12" ry="18" stroke="#C4A882" strokeWidth="0.8" fill="none" />
      <path d="M60 80 Q40 68 30 48" stroke="#7A6352" strokeWidth="0.9" fill="none" />
      <path d="M30 48 Q20 36 28 24 Q42 34 30 48Z" stroke="#7A6352" strokeWidth="0.7" fill="#D4B8A0" />
      <path d="M60 110 Q82 98 92 78" stroke="#7A6352" strokeWidth="0.9" fill="none" />
      <path d="M92 78 Q102 66 94 54 Q80 64 92 78Z" stroke="#7A6352" strokeWidth="0.7" fill="#D4B8A0" />
      <circle cx="38" cy="145" r="8" stroke="#C4A882" strokeWidth="0.7" fill="none" />
      <path d="M60 138 Q50 140 38 145" stroke="#7A6352" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

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
  const [hovered, setHovered] = useState(false);

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
      className="group flex flex-col"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="relative bg-chamomile aspect-[3/4] overflow-hidden mb-5 flex items-center justify-center border border-ochre/10">
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ) : (
          <motion.div
            className="flex flex-col items-center gap-4"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <BotanicalMark />
            <div className="text-center px-6">
              <p className="font-body text-[10px] tracking-micro uppercase text-umber/50 mb-1">
                Arrangement
              </p>
              <div className="w-6 h-px bg-ochre/40 mx-auto" />
            </div>
          </motion.div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display italic text-bark text-xl leading-tight">{product.name}</h3>
          <span className="font-body text-sm text-umber ml-3 whitespace-nowrap mt-1">
            {formatPrice(product.price_cents, product.currency)}
          </span>
        </div>
        <p className="font-body text-umber/80 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {product.description}
        </p>
        <motion.button
          onClick={handleAdd}
          whileHover={{ backgroundColor: added ? undefined : '#3D2E26' }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3 text-sm font-body transition-colors duration-300 border ${
            added
              ? 'bg-bark text-linen border-bark'
              : 'bg-transparent text-bark border-bark/40 hover:text-linen'
          }`}
        >
          {added ? '✓ Added' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.article>
  );
}

function CartSidebar({
  cart, products, open, onClose, onRemove, onUpdate, onCheckout,
}: {
  cart: CartItem[];
  products: Product[];
  open: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, qty: number) => void;
  onCheckout: () => void;
}) {
  const cartProducts = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.product_id),
  }));

  const total = cart.reduce((sum, item) => {
    const p = products.find((pr) => pr.id === item.product_id);
    return sum + (p ? p.price_cents * item.quantity : 0);
  }, 0);

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-bark/40 z-40"
          onClick={onClose}
        />
      )}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? '0%' : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-linen z-50 flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ochre/20">
          <h2 className="font-display italic text-bark text-lg">Your Selections</h2>
          <button onClick={onClose} className="text-umber hover:text-bark transition-colors text-xl">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <BotanicalMark />
              <p className="font-display italic text-umber text-lg mt-4 mb-4">Your cart is empty.</p>
              <button onClick={onClose} className="font-body text-sm text-ochre hover:text-bark transition-colors">
                Continue browsing →
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartProducts.map(({ product_id, quantity, product }) => (
                <li key={product_id} className="flex items-start gap-4 pb-6 border-b border-ochre/15 last:border-0">
                  <div className="w-14 h-14 bg-chamomile border border-ochre/20 flex items-center justify-center shrink-0">
                    <BotanicalMark />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display italic text-bark text-base mb-0.5 truncate">{product?.name ?? product_id}</p>
                    <p className="font-body text-umber text-xs mb-3">{product ? formatPrice(product.price_cents, product.currency) : ''}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-ochre/30">
                        <button
                          onClick={() => quantity > 1 ? onUpdate(product_id, quantity - 1) : onRemove(product_id)}
                          className="w-7 h-7 flex items-center justify-center text-umber hover:text-bark text-sm transition-colors"
                        >−</button>
                        <span className="text-bark text-sm w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdate(product_id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-umber hover:text-bark text-sm transition-colors"
                        >+</button>
                      </div>
                      <button onClick={() => onRemove(product_id)} className="font-body text-xs text-umber hover:text-bark transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                  {product && (
                    <p className="font-body text-bark text-sm whitespace-nowrap">
                      {formatPrice(product.price_cents * quantity, product.currency)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-ochre/20">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-umber text-sm">Total</span>
              <span className="font-display italic text-bark text-xl">{formatPrice(total, 'EUR')}</span>
            </div>
            <p className="font-body text-xs text-umber/60 mb-4">Free EU shipping · 2–4 business days</p>
            <motion.button
              onClick={onCheckout}
              whileHover={{ backgroundColor: '#C4A882' }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-bark text-linen py-3.5 font-body text-sm tracking-wide transition-colors duration-300"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default function ShopClient({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    track('product_view');
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    track('add_to_cart');
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product_id: product.id, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (product_id: string) => {
    setCart((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const updateQty = (product_id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(product_id); return; }
    setCart((prev) => prev.map((i) => (i.product_id === product_id ? { ...i, quantity: qty } : i)));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckingOut(true);
    await checkout(cart);
    setCheckingOut(false);
  };

  return (
    <>
      <div className="min-h-screen bg-linen pt-16">
        {/* Header */}
        <div className="border-b border-ochre/20 bg-linen">
          <div className="max-w-7xl mx-auto px-6 py-20 flex items-end justify-between">
            <div>
              <p className="font-body text-[10px] tracking-micro uppercase text-umber mb-4">All Arrangements</p>
              <h1 className="font-display italic text-bark leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
                The Collection
              </h1>
              <p className="font-body text-umber mt-4 max-w-lg text-base leading-relaxed">
                Each piece is composed by hand. Dried to permanence. Built to be looked at for years.
              </p>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 border border-ochre/40 px-5 py-2.5 font-body text-sm text-bark hover:border-bark transition-colors"
            >
              Cart
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-5 h-5 bg-bark text-linen text-xs font-bold rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {products.length === 0 ? (
            <div className="py-32 text-center">
              <div className="flex justify-center mb-8"><BotanicalMark /></div>
              <h2 className="font-display italic text-bark text-2xl mb-3">Collection coming soon</h2>
              <p className="font-body text-umber mb-8">Our next arrangements are being carefully composed. Check back soon.</p>
              <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-ochre hover:text-bark transition-colors">
                ← Back to home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>

        {cartCount > 0 && !cartOpen && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <motion.button
              onClick={() => setCartOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-bark text-linen pl-5 pr-6 py-3.5 font-body text-sm shadow-xl"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-ochre text-bark text-xs font-bold rounded-full">{cartCount}</span>
              View Cart
              {checkingOut && <span className="text-linen/60 text-xs">Processing…</span>}
            </motion.button>
          </motion.div>
        )}
      </div>

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
