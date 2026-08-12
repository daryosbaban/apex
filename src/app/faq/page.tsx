'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Are the products sold by APEX LTD authentic?',
    a: 'Yes. All products are sourced from authorized distributors and undergo quality checks before shipping.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We support credit/debit cards, PayPal and bank transfer at checkout. This demo storefront does not process real payments.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders arrive within 2–4 business days via express delivery, or 3–6 business days via standard delivery for larger items.',
  },
  {
    q: 'Can I return a product if I change my mind?',
    a: 'Yes, unopened and unused products can be returned within 30 days of delivery. See our Returns page for details.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'We currently ship across all 50 US states, with select international shipping options available at checkout.',
  },
  {
    q: 'How do I track my order?',
    a: 'A tracking link is emailed to you as soon as your order ships, and is also available in your account.',
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-apex py-16">
      <div className="mb-12 text-center">
        <span className="eyebrow">Got Questions?</span>
        <h1 className="section-heading mt-3">Frequently Asked Questions</h1>
      </div>
      <div className="mx-auto max-w-2xl divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((faq, i) => (
          <div key={faq.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-white"
            >
              {faq.q}
              <ChevronDown className={`h-4 w-4 shrink-0 text-gold-500 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="pb-5 text-sm leading-relaxed text-silver-500">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
