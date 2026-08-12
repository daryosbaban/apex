import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopContent } from './ShopContent';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse the full APEX LTD collection of smartphones, laptops, gaming devices and more.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-apex py-24 text-center text-silver-500">Loading products...</div>}>
      <ShopContent />
    </Suspense>
  );
}
