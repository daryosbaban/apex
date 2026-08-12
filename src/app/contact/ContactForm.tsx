'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    addToast("Message sent — we'll be in touch shortly.");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="Full Name" className="input-apex" />
        <input required type="email" placeholder="Email Address" className="input-apex" />
      </div>
      <input type="tel" placeholder="Phone Number (optional)" className="input-apex" />
      <textarea required placeholder="Your Message" rows={5} className="input-apex resize-none" />
      <button type="submit" className="btn-gold w-fit">
        Send Message <Send className="h-3.5 w-3.5" />
      </button>
      {submitted && <p className="text-xs text-gold-400">Thank you — your message has been received.</p>}
    </form>
  );
}
