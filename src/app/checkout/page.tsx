'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, Wallet, Landmark, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from '@/components/ProductArt';

const SHIPPING_FLAT_RATE = 15;
const FREE_SHIPPING_THRESHOLD = 500;
const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Germany', 'France'];

type PaymentMethod = 'card' | 'paypal' | 'bank';

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => `CAATG-${Math.floor(100000 + Math.random() * 900000)}`);

  const items = lines
    .map((line) => ({ line, product: products.find((p) => p.id === line.productId) }))
    .filter((i) => i.product);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 1200);
  }

  if (placed) {
    return (
      <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
        <CheckCircle2 className="h-16 w-16 text-gold-400" />
        <h1 className="section-heading">Order Confirmed</h1>
        <p className="max-w-md text-sm text-silver-500">
          Thank you for shopping with CAATG LTD. Your order <span className="text-gold-400">#{orderId}</span> has been
          placed. A confirmation email will be sent shortly. This is a demo checkout — no payment was processed.
        </p>
        <Link href="/shop" className="btn-gold mt-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
        <h1 className="section-heading">Your cart is empty</h1>
        <p className="text-sm text-silver-500">Add some products before proceeding to checkout.</p>
        <Link href="/shop" className="btn-gold mt-2">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-apex py-14">
      <div className="mb-10">
        <span className="eyebrow">Secure Checkout</span>
        <h1 className="section-heading mt-3">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-10">
          {/* Customer information */}
          <section>
            <h2 className="mb-5 font-display text-lg font-semibold text-white">Customer Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Full Name" className="input-apex sm:col-span-2" />
              <input required type="email" placeholder="Email Address" className="input-apex" />
              <input required type="tel" placeholder="Phone Number" className="input-apex" />
            </div>
          </section>

          {/* Shipping information */}
          <section>
            <h2 className="mb-5 font-display text-lg font-semibold text-white">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <select required defaultValue="" className="input-apex cursor-pointer">
                <option value="" disabled className="bg-obsidian-900">
                  Select Country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="bg-obsidian-900">
                    {c}
                  </option>
                ))}
              </select>
              <input required placeholder="City" className="input-apex" />
              <input required placeholder="Delivery Address" className="input-apex sm:col-span-2" />
              <textarea placeholder="Additional Notes (optional)" rows={3} className="input-apex sm:col-span-2 resize-none" />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-5 font-display text-lg font-semibold text-white">Payment Method</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { id: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'paypal' as const, label: 'PayPal', icon: Wallet },
                { id: 'bank' as const, label: 'Bank Transfer', icon: Landmark },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setPayment(id)}
                  className={`flex flex-col items-center gap-2 border px-4 py-5 text-center transition-colors ${
                    payment === id ? 'border-gold-500 bg-gold-500/5' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${payment === id ? 'text-gold-400' : 'text-silver-400'}`} />
                  <span className={`text-xs font-medium ${payment === id ? 'text-gold-400' : 'text-silver-400'}`}>{label}</span>
                </button>
              ))}
            </div>

            {payment === 'card' && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required placeholder="Card Number" className="input-apex sm:col-span-2" />
                <input required placeholder="MM / YY" className="input-apex" />
                <input required placeholder="CVC" className="input-apex" />
              </div>
            )}
            {payment === 'paypal' && (
              <p className="mt-5 text-sm text-silver-500">You will be redirected to PayPal to complete your purchase securely. (Demo only)</p>
            )}
            {payment === 'bank' && (
              <p className="mt-5 text-sm text-silver-500">Bank transfer instructions will be emailed after order confirmation. (Demo only)</p>
            )}

            <p className="mt-4 flex items-center gap-2 text-xs text-silver-600">
              <Lock className="h-3.5 w-3.5" /> This is a demo checkout. No real payment will be processed.
            </p>
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit border border-white/10 p-6">
          <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>
          <div className="mt-5 flex max-h-64 flex-col gap-4 overflow-y-auto pr-1">
            {items.map(({ line, product }) => (
              <div key={line.productId} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0">
                  <ProductArt category={product!.category} className="h-full w-full" showLabel={false} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-obsidian-950">
                    {line.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{product!.name}</p>
                  <p className="text-xs text-silver-600">{product!.brand}</p>
                </div>
                <span className="text-sm font-semibold text-silver-300">{formatPrice(product!.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between text-silver-400">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-silver-400">
              <span>Shipping</span>
              <span className="text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
              <span className="text-white">Total</span>
              <span className="text-gold-400">{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" disabled={placing} className="btn-gold mt-6 w-full disabled:opacity-60">
            {placing ? 'Placing Order...' : `Place Order — ${formatPrice(total)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}
