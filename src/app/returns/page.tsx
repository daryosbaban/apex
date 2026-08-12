import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Returns Policy' };

const STEPS = [
  { step: '1', title: 'Request a Return', text: 'Contact our support team within 30 days of delivery to initiate a return.' },
  { step: '2', title: 'Pack Your Item', text: 'Return the product in its original packaging with all accessories included.' },
  { step: '3', title: 'Ship It Back', text: 'Use the prepaid return label we provide for eligible orders.' },
  { step: '4', title: 'Get Refunded', text: 'Once inspected, your refund is processed within 5–7 business days.' },
];

export default function ReturnsPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-12 text-center">
        <span className="eyebrow">Hassle-Free</span>
        <h1 className="section-heading mt-3">Returns &amp; Exchanges</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-silver-500">
          Not satisfied with your purchase? We offer a 30-day return window on unopened, unused products in their
          original packaging.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ step, title, text }) => (
          <div key={step} className="card-elevated p-6">
            <span className="font-display text-3xl font-bold text-gold-500/70">{step}</span>
            <h3 className="mt-4 font-display text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-silver-500">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-sm text-silver-500">
        Note: certain items such as opened earbuds and personalized products may not be eligible for return. See our
        FAQ for full details or contact support for assistance.
      </p>
    </div>
  );
}
