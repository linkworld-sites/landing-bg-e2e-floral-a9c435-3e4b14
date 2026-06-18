import { track } from '@/lib/funnel';

export interface Product {
  product_id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  image_url: string;
  stock: number | null;
}

export interface CartItem {
  product_id: string;
  quantity: number;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) return [];
    return res.json() as Promise<Product[]>;
  } catch {
    return [];
  }
}

export function formatPrice(price_cents: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price_cents / 100);
}

export async function checkout(items: CartItem[]): Promise<void> {
  track('intent');
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Checkout failed');
    const data = (await res.json()) as { url?: string };
    if (data.url) window.location.href = data.url;
  } catch (e) {
    console.error('Checkout error:', e);
  }
}
