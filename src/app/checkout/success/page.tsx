import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SuccessContent } from './SuccessContent';

export const metadata: Metadata = {
  title: 'Order Confirmation',
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container-apex py-32 text-center text-silver-500">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
