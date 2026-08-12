'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ShopFilters, FilterState, PRICE_CEILING } from '@/components/ShopFilters';
import { products } from '@/lib/products';
import { CategorySlug } from '@/lib/types';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Best Rated',
  popular: 'Most Popular',
};

export function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get('category') as CategorySlug | null;
  const initialQuery = searchParams.get('q') ?? '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    brands: [],
    maxPrice: PRICE_CEILING,
    minRating: 0,
    inStockOnly: false,
  });

  useEffect(() => {
    const cat = searchParams.get('category') as CategorySlug | null;
    if (cat && !filters.categories.includes(cat)) {
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.stock === 'out-of-stock') return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q) &&
          !p.shortDescription.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    switch (sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result = [...result].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return result;
  }, [filters, searchTerm, sortBy]);

  return (
    <div className="container-apex py-10">
      <div className="mb-8 flex flex-col gap-2">
        <span className="eyebrow">The Full Collection</span>
        <h1 className="section-heading">Shop All Products</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <ShopFilters filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-600" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="input-apex pl-9"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-dark px-4 py-2.5 text-xs lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input-apex w-auto cursor-pointer py-2.5 pr-8 text-xs"
              >
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="bg-obsidian-900">
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mb-6 text-xs text-silver-500">{filtered.length} products found</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-silver-400">No products match your filters.</p>
              <button
                onClick={() => {
                  setFilters({ categories: [], brands: [], maxPrice: PRICE_CEILING, minRating: 0, inStockOnly: false });
                  setSearchTerm('');
                  router.push('/shop');
                }}
                className="btn-outline text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[95] flex lg:hidden">
          <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-obsidian-900 p-6 shadow-elevated animate-fade-up">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-white">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="text-silver-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ShopFilters filters={filters} setFilters={setFilters} />
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-gold mt-8">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
