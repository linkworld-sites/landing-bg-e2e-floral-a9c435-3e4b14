import { CATALOG } from '@/lib/products';
import ShopClient from '@/components/ShopClient';

export default function ShopPage() {
  return <ShopClient products={CATALOG} />;
}
