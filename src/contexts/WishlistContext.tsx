'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';

interface WishlistContextValue {
  ids: string[];
  toggleWishlist: (productId: string, name?: string) => void;
  isWishlisted: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'apex-wishlist-v1';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const toggleWishlist = useCallback(
    (productId: string, name?: string) => {
      setIds((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          addToast(`${name ?? 'Item'} removed from wishlist`);
          return prev.filter((id) => id !== productId);
        }
        addToast(`${name ?? 'Item'} added to wishlist`);
        return [...prev, productId];
      });
    },
    [addToast]
  );

  const removeFromWishlist = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const isWishlisted = useCallback((productId: string) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggleWishlist, isWishlisted, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
