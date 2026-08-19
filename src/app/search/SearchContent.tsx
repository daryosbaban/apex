'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';

export function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        Object.values(p.specs).some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="container-apex py-14">
      <div className="mb-8">
        <span className="eyebrow">Search Results</span>
        <h1 className="section-heading mt-3">
          {query ? (
            <>
              Results for &ldquo;<span className="gold-text">{query}</span>&rdquo;
            </>
          ) : (
            'Search CAATG LTD'
          )}
        </h1>
      </div>

      <div className="relative mb-10 max-w-lg">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-600" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for iPhone, Samsung, HP, Lenovo, gaming, headphones..."
          className="input-apex pl-11"
        />
      </div>

      {query.trim() === '' ? (
        <p className="text-silver-500">Start typing to search across our full electronics catalog.</p>
      ) : results.length === 0 ? (
        <p className="text-silver-500">No products found for &ldquo;{query}&rdquo;. Try a different keyword.</p>
      ) : (
        <>
          <p className="mb-6 text-xs text-silver-500">{results.length} results found</p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
