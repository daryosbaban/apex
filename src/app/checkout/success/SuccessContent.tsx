'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

type VerifyState =
  | { status: 'loading' }
  | { status: 'paid'; amountTotal: number | null; customerEmail: string | null }
  | { status: 'unpaid' }
  | { status: 'error' };

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [state, setState] = useState<VerifyState>({ status: 'loading' });
  const cleared = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setState({ status: 'error' });
      return;
    }
    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          if (!cleared.current) {
            clearCart();
            cleared.current = true;
          }
          setState({ status: 'paid', amountTotal: data.amountTotal, customerEmail: data.customerEmail });
        } else {
          setState({ status: 'unpaid' });
        }
      })
      .catch(() => setState({ status: 'error' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (state.status === 'loading') {
    return (
      <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
        <p className="text-silver-400">Confirming your payment...</p>
      </div>
    );
  }

  if (state.status === 'paid') {
    return (
      <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
        <CheckCircle2 className="h-16 w-16 text-gold-400" />
        <h1 className="section-heading">Payment Confirmed</h1>
        <p className="max-w-md text-sm text-silver-500">
          Thank you for shopping with CAATG LTD.
          {state.amountTotal != null && (
            <>
              {' '}
              You were charged <span className="text-gold-400">{formatPrice(state.amountTotal / 100)}</span>.
            </>
          )}
          {state.customerEmail && <> A receipt has been sent to {state.customerEmail}.</>}
        </p>
        <Link href="/shop" className="btn-gold mt-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
      <XCircle className="h-16 w-16 text-red-400" />
      <h1 className="section-heading">We Couldn&rsquo;t Confirm This Payment</h1>
      <p className="max-w-md text-sm text-silver-500">
        We weren&rsquo;t able to verify this checkout session. If you were charged, please contact support with your
        payment reference — otherwise, your cart is safe and nothing was ordered.
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/cart" className="btn-outline">
          Back to Cart
        </Link>
        <Link href="/contact" className="btn-gold">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
