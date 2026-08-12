'use client';

import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export default function AccountPage() {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const { addToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addToast('This is a demo storefront — account features are for preview only.');
  }

  return (
    <div className="container-apex flex justify-center py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <User className="mx-auto mb-4 h-9 w-9 text-gold-500" strokeWidth={1.5} />
          <h1 className="section-heading">My Account</h1>
        </div>

        <div className="mb-6 flex border-b border-white/10">
          {(['signin', 'register'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                tab === t ? 'border-gold-500 text-gold-400' : 'border-transparent text-silver-500 hover:text-silver-300'
              }`}
            >
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'register' && <input required placeholder="Full Name" className="input-apex" />}
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-600" />
            <input required type="email" placeholder="Email Address" className="input-apex pl-10" />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-600" />
            <input required type="password" placeholder="Password" className="input-apex pl-10" />
          </div>
          <button type="submit" className="btn-gold mt-2">
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-silver-600">
          This is a demo storefront. Account creation and sign-in are for preview purposes only.
        </p>
      </div>
    </div>
  );
}
