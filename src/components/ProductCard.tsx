'use client';

import Link from 'next/link';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { discountPercent } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from './ProductArt';
import { StarRating } from './StarRating';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useQuickView } from '@/contexts/QuickViewContext';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const discount = discountPercent(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock === 'out-of-stock';

  return (
    <div className="card-elevated group relative flex flex-col overflow-hidden hover:border-gold-700/40 hover:shadow-elevated">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
            <ProductArt category={product.category} brand={product.brand} className="h-full w-full" />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-sm bg-obsidian-950/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 ring-1 ring-gold-700/40">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-sm bg-gold-gradient px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian-950">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist + quick view */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => toggleWishlist(product.id, product.name)}
            aria-label="Add to wishlist"
            className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition-colors ${
              wishlisted
                ? 'border-gold-500 bg-gold-500/20 text-gold-400'
                : 'border-white/15 bg-obsidian-950/70 text-silver-200 hover:border-gold-500 hover:text-gold-400'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-gold-400' : ''}`} />
          </button>
          <button
            onClick={() => openQuickView(product.id)}
            aria-label="Quick view"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-obsidian-950/70 text-silver-200 backdrop-blur transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/60">
            <span className="rounded-sm border border-silver-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-silver-200">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest2 text-silver-500">{product.brand}</span>
        <Link href={`/product/${product.slug}`} className="font-display text-sm font-semibold text-white line-clamp-2 hover:text-gold-400">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs text-silver-500">{product.shortDescription}</p>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="xs" />

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-silver-600 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.stock === 'low-stock' && (
          <span className="text-[11px] font-medium text-gold-500">Only a few left</span>
        )}

        <button
          onClick={() => !outOfStock && addToCart(product.id)}
          disabled={outOfStock}
          className="btn-dark mt-2 w-full py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {outOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
