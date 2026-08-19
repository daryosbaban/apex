import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-10">
        <span className="eyebrow">Legal</span>
        <h1 className="section-heading mt-3">Terms of Service</h1>
        <p className="mt-2 text-xs text-silver-600">Last updated: August 2026</p>
      </div>
      <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-silver-400">
        <p>
          By accessing and using the CAATG LTD website, you agree to be bound by these Terms of Service. Please read
          them carefully before making a purchase.
        </p>
        <p>
          <strong className="text-white">Pricing:</strong> All prices are displayed in USD and represent
          approximate retail pricing. Prices are subject to change without notice and are not guaranteed to be
          live-verified against manufacturer pricing.
        </p>
        <p>
          <strong className="text-white">Orders:</strong> Placing an order constitutes an offer to purchase.
          Availability is not guaranteed until an order is confirmed.
        </p>
        <p>
          <strong className="text-white">Warranty:</strong> Products are covered under the warranty terms specified
          on each product page.
        </p>
        <p>
          <strong className="text-white">Limitation of Liability:</strong> CAATG LTD is not liable for indirect or
          incidental damages arising from the use of our products or services.
        </p>
      </div>
    </div>
  );
}
