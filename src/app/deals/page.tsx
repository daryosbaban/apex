import type { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { DealsCountdown } from '@/components/DealsCountdown';
import { getDealProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Deals',
  description: 'Limited-time discounts on flagship smartphones, laptops, gaming devices and more at APEX LTD.',
};

export default function DealsPage() {
  const deals = getDealProducts();

  return (
    <div className="bg-dark-radial">
      <section className="border-b border-white/[0.06] py-20">
        <div className="container-apex flex flex-col items-center gap-5 text-center">
          <span className="eyebrow flex items-center gap-2">
            <Flame className="h-4 w-4" /> Limited-Time Offers
          </span>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            The Best Deals. <span className="gold-text">At Their Apex.</span>
          </h1>
          <p className="max-w-lg text-sm text-silver-500">
            Hand-picked discounts on flagship devices from Apple, Samsung, Sony, ASUS and more — while stocks last.
          </p>
          <DealsCountdown />
        </div>
      </section>

      <section className="container-apex py-16">
        <p className="mb-8 text-xs text-silver-500">{deals.length} deals available</p>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
