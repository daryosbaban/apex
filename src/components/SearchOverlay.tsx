'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ProductArt } from './ProductArt';

const POPULAR_SEARCHES = ['iPhone', 'Samsung', 'MacBook', 'Gaming', 'Headphones', 'Monitor', 'PlayStation'];

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const results = useMemo(() => {
    if (query.trim().length < 1) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  function submitSearch(term: string) {
    if (!term.trim()) return;
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-obsidian-950/90 backdrop-blur-sm">
      <div className="mt-24 w-full max-w-2xl px-4">
        <div className="card-elevated border-gold-800/30 p-5 shadow-elevated">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Search className="h-5 w-5 text-gold-500" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch(query)}
              placeholder="Search for iPhone, Samsung, MacBook, gaming, headphones..."
              className="flex-1 bg-transparent text-base text-silver-100 outline-none placeholder:text-silver-600"
            />
            <button onClick={onClose} aria-label="Close search" className="text-silver-500 hover:text-silver-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {query.trim().length === 0 && (
            <div className="pt-4">
              <p className="eyebrow mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => submitSearch(term)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver-300 transition-colors hover:border-gold-600 hover:text-gold-400"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length > 0 && (
            <div className="max-h-[60vh] overflow-y-auto pt-3">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-silver-500">No products found for &ldquo;{query}&rdquo;</p>
              ) : (
                <ul className="flex flex-col divide-y divide-white/5">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 py-3 transition-colors hover:bg-white/[0.03]"
                      >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                          <ProductArt category={p.category} className="h-full w-full" showLabel={false} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] uppercase tracking-wide text-silver-500">{p.brand}</p>
                          <p className="truncate text-sm font-medium text-white">{p.name}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-gold-400">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => submitSearch(query)}
                className="mt-2 flex w-full items-center justify-center gap-2 border-t border-white/10 py-3 text-xs font-semibold uppercase tracking-widest2 text-gold-400 hover:text-gold-300"
              >
                View all results for &ldquo;{query}&rdquo; <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
