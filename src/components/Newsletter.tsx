'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    addToast('Thanks for subscribing to CAATG LTD updates.');
    setEmail('');
  }

  return (
    <section className="border-t border-white/[0.06] bg-charcoal/40">
      <div className="container-apex flex flex-col items-center gap-6 py-20 text-center">
        <Mail className="h-8 w-8 text-gold-500" strokeWidth={1.5} />
        <h2 className="section-heading">Stay Ahead of the Curve</h2>
        <p className="max-w-md text-sm text-silver-500">
          Subscribe for early access to new arrivals, exclusive deals and CAATG LTD news.
        </p>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input-apex flex-1"
          />
          <button type="submit" className="btn-gold whitespace-nowrap px-6">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
