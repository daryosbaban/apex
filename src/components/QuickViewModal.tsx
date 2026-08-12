'use client';

import Link from 'next/link';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { useQuickView } from '@/contexts/QuickViewContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { products, discountPercent } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from './ProductArt';
import { StarRating } from './StarRating';

export function QuickViewModal() {
  const { productId, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!productId) return null;
  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  const discount = discountPercent(product);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-sm" onClick={closeQuickView} />
      <div className="relative w-full max-w-3xl overflow-hidden bg-obsidian-900 shadow-elevated animate-fade-up">
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-obsidian-950/70 text-silver-300 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid max-h-[85vh] grid-cols-1 overflow-y-auto sm:grid-cols-2">
          <div className="aspect-square">
            <ProductArt category={product.category} brand={product.brand} className="h-full w-full" />
          </div>
          <div className="flex flex-col gap-3 p-6">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-silver-500">{product.brand}</span>
            <h2 className="font-display text-2xl font-bold text-white">{product.name}</h2>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <p className="text-sm text-silver-400">{product.shortDescription}</p>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-silver-600 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-gold-400">Save {discount}%</span>
                </>
              )}
            </div>

            <span
              className={`w-fit rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                product.stock === 'in-stock'
                  ? 'bg-green-500/10 text-green-400'
                  : product.stock === 'low-stock'
                    ? 'bg-gold-500/10 text-gold-400'
                    : 'bg-red-500/10 text-red-400'
              }`}
            >
              {product.stock === 'in-stock' ? 'In Stock' : product.stock === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
            </span>

            <ul className="mt-1 flex flex-col gap-1.5 text-xs text-silver-400">
              {product.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex gap-2.5">
              <button
                onClick={() => product.stock !== 'out-of-stock' && addToCart(product.id)}
                disabled={product.stock === 'out-of-stock'}
                className="btn-gold flex-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                aria-label="Toggle wishlist"
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                  wishlisted ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/15 text-silver-300 hover:border-gold-500 hover:text-gold-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-gold-400' : ''}`} />
              </button>
            </div>
            <Link
              href={`/product/${product.slug}`}
              onClick={closeQuickView}
              className="mt-1 text-center text-xs font-semibold uppercase tracking-widest2 text-silver-400 hover:text-gold-400"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
