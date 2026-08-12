'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from '@/components/ProductArt';

const SHIPPING_FLAT_RATE = 15;
const FREE_SHIPPING_THRESHOLD = 500;

export default function CartPage() {
  const { lines, setQuantity, removeFromCart, subtotal } = useCart();
  const items = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((i) => i.product);

  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  return (
    <div className="container-apex py-14">
      <div className="mb-10">
        <span className="eyebrow">Review Your Order</span>
        <h1 className="section-heading mt-3">Shopping Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 border border-white/10 py-24 text-center">
          <ShoppingBag className="h-14 w-14 text-silver-700" />
          <p className="text-silver-400">Your cart is currently empty.</p>
          <Link href="/shop" className="btn-gold">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col divide-y divide-white/5 border-y border-white/10">
            {items.map(({ line, product }) => (
              <div key={line.productId} className="flex gap-4 py-6 sm:gap-6">
                <Link href={`/product/${product!.slug}`} className="h-24 w-24 shrink-0 overflow-hidden sm:h-32 sm:w-32">
                  <ProductArt category={product!.category} className="h-full w-full" showLabel={false} />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase tracking-wide text-silver-500">{product!.brand}</span>
                      <Link href={`/product/${product!.slug}`} className="mt-1 block font-display text-base font-semibold text-white hover:text-gold-400">
                        {product!.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(line.productId)}
                      aria-label="Remove item"
                      className="text-silver-600 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-sm border border-white/10">
                      <button
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-silver-300 hover:text-gold-400"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm text-white">{line.quantity}</span>
                      <button
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-silver-300 hover:text-gold-400"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-white">{formatPrice(product!.price * line.quantity)}</p>
                      <p className="text-xs text-silver-600">{formatPrice(product!.price)} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <Link href="/shop" className="text-sm font-medium text-silver-400 hover:text-gold-400">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          <aside className="h-fit border border-white/10 p-6">
            <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-silver-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-silver-400">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-silver-600">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
              )}
              <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                <span className="text-white">Total</span>
                <span className="text-gold-400">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-gold mt-6 w-full">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
