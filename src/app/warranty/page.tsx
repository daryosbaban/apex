import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = { title: 'Warranty' };

export default function WarrantyPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-12 text-center">
        <ShieldCheck className="mx-auto mb-4 h-9 w-9 text-gold-500" strokeWidth={1.5} />
        <span className="eyebrow">Buy With Confidence</span>
        <h1 className="section-heading mt-3">Warranty Coverage</h1>
      </div>
      <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-silver-400">
        <p>
          Every product sold by CAATG LTD includes, at minimum, a 1-Year CAATG LTD Limited Warranty covering
          manufacturing defects. Select categories such as laptops, monitors, cameras and components include an
          extended 2-Year Manufacturer Warranty, as noted on each product page.
        </p>
        <p>
          If a covered product develops a fault during the warranty period, contact our support team with your
          order number and a description of the issue. We&rsquo;ll guide you through diagnostics, repair, or
          replacement depending on the situation.
        </p>
        <p>
          Warranty coverage does not extend to accidental damage, unauthorized modifications, or normal wear and
          tear. Extended protection plans are available at checkout for select products.
        </p>
      </div>
    </div>
  );
}
