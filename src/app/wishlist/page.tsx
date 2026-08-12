'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <div className="container-apex py-14">
      <div className="mb-10">
        <span className="eyebrow">Saved For Later</span>
        <h1 className="section-heading mt-3">Your Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 border border-white/10 py-24 text-center">
          <Heart className="h-14 w-14 text-silver-700" />
          <p className="text-silver-400">Your wishlist is empty.</p>
          <Link href="/shop" className="btn-gold">
            Discover Products
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-6 text-xs text-silver-500">{items.length} items saved</p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
