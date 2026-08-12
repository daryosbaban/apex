'use client';

import { Star } from 'lucide-react';
import { categories } from '@/lib/categories';
import { brands } from '@/lib/products';
import { CategorySlug } from '@/lib/types';

export interface FilterState {
  categories: CategorySlug[];
  brands: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export const PRICE_CEILING = 2600;

export function ShopFilters({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: (updater: (prev: FilterState) => FilterState) => void;
}) {
  function toggleCategory(slug: CategorySlug) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  }

  function toggleBrand(brand: string) {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
    }));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-gold-500">Category</h3>
        <ul className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-silver-400 hover:text-silver-200">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  className="h-4 w-4 rounded-sm border-silver-600 bg-obsidian-900 accent-gold-500"
                />
                {cat.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-gold-500">Brand</h3>
        <ul className="flex max-h-52 flex-col gap-2.5 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-silver-400 hover:text-silver-200">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 rounded-sm border-silver-600 bg-obsidian-900 accent-gold-500"
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-gold-500">Max Price</h3>
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-gold-500"
        />
        <div className="mt-1 flex justify-between text-xs text-silver-500">
          <span>$0</span>
          <span className="font-semibold text-gold-400">${filters.maxPrice.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-gold-500">Minimum Rating</h3>
        <div className="flex flex-col gap-2">
          {[4.5, 4, 3.5, 0].map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center gap-2.5 text-sm text-silver-400 hover:text-silver-200">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === rating}
                onChange={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                className="h-4 w-4 border-silver-600 bg-obsidian-900 accent-gold-500"
              />
              {rating === 0 ? (
                'Any Rating'
              ) : (
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" /> {rating}+ &amp; up
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-gold-500">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-silver-400 hover:text-silver-200">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
            className="h-4 w-4 rounded-sm border-silver-600 bg-obsidian-900 accent-gold-500"
          />
          In Stock Only
        </label>
      </div>

      <button
        onClick={() =>
          setFilters(() => ({ categories: [], brands: [], maxPrice: PRICE_CEILING, minRating: 0, inStockOnly: false }))
        }
        className="text-left text-xs font-semibold uppercase tracking-widest2 text-silver-500 hover:text-gold-400"
      >
        Clear All Filters
      </button>
    </div>
  );
}
