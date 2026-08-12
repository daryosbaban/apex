'use client';

import { createContext, useContext, useState } from 'react';

interface QuickViewContextValue {
  productId: string | null;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [productId, setProductId] = useState<string | null>(null);
  return (
    <QuickViewContext.Provider
      value={{ productId, openQuickView: setProductId, closeQuickView: () => setProductId(null) }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error('useQuickView must be used within QuickViewProvider');
  return ctx;
}
