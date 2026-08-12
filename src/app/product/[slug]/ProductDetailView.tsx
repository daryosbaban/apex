'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Heart, ShoppingBag, Minus, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/lib/types';
import { discountPercent, getRelatedProducts, products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from '@/components/ProductArt';
import { StarRating } from '@/components/StarRating';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { getCategory } from '@/lib/categories';

export function ProductDetailView({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { ids: recentIds, addRecentlyViewed } = useRecentlyViewed();
  const router = useRouter();

  useEffect(() => {
    addRecentlyViewed(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const discount = discountPercent(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock === 'out-of-stock';
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const recentlyViewed = recentIds
    .filter((id) => id !== product.id)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  function handleBuyNow() {
    if (outOfStock) return;
    addToCart(product.id, quantity);
    router.push('/checkout');
  }

  return (
    <div className="container-apex py-10">
      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-xs text-silver-500">
        <Link href="/" className="hover:text-gold-400">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-gold-400">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-gold-400">{category?.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-silver-300">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden border border-white/[0.06]">
            <ProductArt category={product.category} brand={product.brand} variant={activeImage} className="h-full w-full" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-square overflow-hidden border transition-colors ${
                  activeImage === i ? 'border-gold-500' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <ProductArt category={product.category} variant={i} className="h-full w-full" showLabel={false} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest2 text-silver-500">{product.brand}</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            {product.badge && (
              <span className="rounded-sm bg-obsidian-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-400 ring-1 ring-gold-700/40">
                {product.badge}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-silver-600 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="rounded-sm bg-gold-500/10 px-2 py-0.5 text-sm font-semibold text-gold-400">
                  Save {discount}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-silver-600">Approx. Retail Price, in USD. Prices are not live-verified.</p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-silver-400">{product.description}</p>

          <div className="mt-6">
            <span
              className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                product.stock === 'in-stock'
                  ? 'bg-green-500/10 text-green-400'
                  : product.stock === 'low-stock'
                    ? 'bg-gold-500/10 text-gold-400'
                    : 'bg-red-500/10 text-red-400'
              }`}
            >
              {product.stock === 'in-stock' ? 'In Stock' : product.stock === 'low-stock' ? 'Low Stock — Order Soon' : 'Out of Stock'}
            </span>
          </div>

          {product.colorways && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-silver-500">Available Colors</p>
              <div className="flex flex-wrap gap-2">
                {product.colorways.map((c) => (
                  <span key={c} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-sm border border-white/10 px-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-9 items-center justify-center text-silver-300 hover:text-gold-400"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-9 items-center justify-center text-silver-300 hover:text-gold-400"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => !outOfStock && addToCart(product.id, quantity)}
              disabled={outOfStock}
              className="btn-outline flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id, product.name)}
              aria-label="Toggle wishlist"
              className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-sm border transition-colors ${
                wishlisted ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/15 text-silver-300 hover:border-gold-500 hover:text-gold-400'
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? 'fill-gold-400' : ''}`} />
            </button>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="btn-gold mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            Buy Now
          </button>

          {/* Delivery & warranty */}
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm text-silver-400">
              <Truck className="h-4 w-4 shrink-0 text-gold-500" /> {product.delivery}
            </div>
            <div className="flex items-center gap-3 text-sm text-silver-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-gold-500" /> {product.warranty}
            </div>
            <div className="flex items-center gap-3 text-sm text-silver-400">
              <RotateCcw className="h-4 w-4 shrink-0 text-gold-500" /> 30-day return policy
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-8 border-b border-white/10">
          {(['description', 'specs', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 pb-4 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === tab ? 'border-gold-500 text-gold-400' : 'border-transparent text-silver-500 hover:text-silver-300'
              }`}
            >
              {tab === 'description' ? 'Description & Features' : tab === 'specs' ? 'Specifications' : 'Warranty & Delivery'}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <p className="text-sm leading-relaxed text-silver-400">{product.description}</p>
              <ul className="flex flex-col gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-silver-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl divide-y divide-white/5 border border-white/10">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-4 px-5 py-3.5">
                  <span className="text-sm text-silver-500">{key}</span>
                  <span className="text-sm text-white">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <Truck className="mb-3 h-5 w-5 text-gold-500" />
                <p className="text-sm font-semibold text-white">Delivery</p>
                <p className="mt-1 text-sm text-silver-500">{product.delivery}</p>
              </div>
              <div>
                <ShieldCheck className="mb-3 h-5 w-5 text-gold-500" />
                <p className="text-sm font-semibold text-white">Warranty</p>
                <p className="mt-1 text-sm text-silver-500">{product.warranty}</p>
              </div>
              <div>
                <RotateCcw className="mb-3 h-5 w-5 text-gold-500" />
                <p className="text-sm font-semibold text-white">Returns</p>
                <p className="mt-1 text-sm text-silver-500">30-day hassle-free returns on unopened products.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-16">
          <h2 className="section-heading mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-16">
          <h2 className="section-heading mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
