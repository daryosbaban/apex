import type { Metadata } from 'next';
import { Truck, Globe2, PackageCheck, Clock } from 'lucide-react';

export const metadata: Metadata = { title: 'Shipping Information' };

const TIERS = [
  { icon: Clock, title: 'Express Delivery', text: '2–4 business days on smartphones, tablets, audio and accessories.' },
  { icon: Truck, title: 'Standard Delivery', text: '3–6 business days on laptops, monitors, cameras and large components.' },
  { icon: Globe2, title: 'Nationwide Coverage', text: 'We currently ship to all 50 states, with select international options.' },
  { icon: PackageCheck, title: 'Order Tracking', text: 'A tracking link is emailed as soon as your order ships.' },
];

export default function ShippingPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-12 text-center">
        <span className="eyebrow">Delivery Information</span>
        <h1 className="section-heading mt-3">Shipping</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-silver-500">
          Orders over $500 ship free. All orders are carefully packaged and insured in transit.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card-elevated p-6">
            <Icon className="mb-4 h-6 w-6 text-gold-500" strokeWidth={1.5} />
            <h3 className="font-display text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-silver-500">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
