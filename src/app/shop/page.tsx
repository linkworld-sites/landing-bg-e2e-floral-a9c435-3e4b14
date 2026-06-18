import { CATALOG } from '@/lib/products';
import { fetchProducts } from '@/lib/checkout';
import ShopClient from '@/components/ShopClient';

export default async function ShopPage() {
  const live = await fetchProducts();
  return <ShopClient products={live.length > 0 ? live : CATALOG} />;
}
