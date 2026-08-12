'use client';

import { CheckCircle2, X } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-up flex items-center gap-3 rounded-sm border border-gold-700/40 bg-obsidian-900/95 px-4 py-3 shadow-elevated backdrop-blur"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" />
          <p className="flex-1 text-sm text-silver-100">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-silver-500 hover:text-silver-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
