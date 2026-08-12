'use client';

import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from './ProductArt';

export function CartDrawer() {
  const { lines, isDrawerOpen, closeDrawer, setQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (!isDrawerOpen) return null;

  const items = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((i) => i.product);

  return (
    <div className="fixed inset-0 z-[95] flex justify-end">
      <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" onClick={closeDrawer} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-obsidian-900 shadow-elevated animate-fade-up">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="font-display text-lg font-semibold text-white">
            Your Cart <span className="text-sm font-normal text-silver-500">({totalItems})</span>
          </h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="text-silver-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-silver-700" />
            <p className="text-silver-400">Your cart is empty.</p>
            <button onClick={closeDrawer} className="btn-outline text-xs">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              <ul className="flex flex-col gap-5">
                {items.map(({ line, product }) => (
                  <li key={line.productId} className="flex gap-3">
                    <Link href={`/product/${product!.slug}`} onClick={closeDrawer} className="h-20 w-20 shrink-0 overflow-hidden rounded-sm">
                      <ProductArt category={product!.category} className="h-full w-full" showLabel={false} />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${product!.slug}`} onClick={closeDrawer} className="text-sm font-medium text-white hover:text-gold-400 line-clamp-2">
                          {product!.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(line.productId)}
                          aria-label="Remove item"
                          className="text-silver-600 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="mt-0.5 text-xs text-silver-500">{product!.brand}</span>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-sm border border-white/10">
                          <button
                            onClick={() => setQuantity(line.productId, line.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-silver-300 hover:text-gold-400"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs text-white">{line.quantity}</span>
                          <button
                            onClick={() => setQuantity(line.productId, line.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-silver-300 hover:text-gold-400"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-gold-400">
                          {formatPrice(product!.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-silver-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-silver-600">Shipping and taxes calculated at checkout.</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Link href="/checkout" onClick={closeDrawer} className="btn-gold w-full">
                  Proceed to Checkout
                </Link>
                <button onClick={closeDrawer} className="btn-outline w-full">
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
