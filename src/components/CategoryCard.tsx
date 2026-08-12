import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { ProductArt } from './ProductArt';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-white/[0.06] bg-charcoal transition-all duration-500 hover:border-gold-700/40"
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <ProductArt category={category.slug} className="h-full w-full" showLabel={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

      <div className="relative z-10 flex items-end justify-between p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{category.name}</h3>
          <p className="mt-1 max-w-[20ch] text-xs text-silver-500">{category.blurb}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-silver-200 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-obsidian-950">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
