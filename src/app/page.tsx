import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Newsletter } from '@/components/Newsletter';
import { categories } from '@/lib/categories';
import { getFeaturedProducts, getDealProducts, brands } from '@/lib/products';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const deals = getDealProducts().slice(0, 4);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Categories */}
      <section className="container-apex py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Browse the Range</span>
            <h2 className="section-heading mt-3">Shop by Category</h2>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-sm font-medium text-silver-400 hover:text-gold-400">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-white/[0.06] bg-charcoal/30 py-24">
        <div className="container-apex">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Handpicked For You</span>
              <h2 className="section-heading mt-3">Featured Products</h2>
            </div>
            <Link href="/shop" className="flex items-center gap-2 text-sm font-medium text-silver-400 hover:text-gold-400">
              Explore Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Deals teaser */}
      <section className="py-24">
        <div className="container-apex">
          <div className="relative overflow-hidden border border-gold-800/30 bg-gradient-to-br from-charcoal via-charcoal-light to-obsidian-950 px-6 py-14 sm:px-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-[100px]" />
            <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow">Limited-Time Offers</span>
                <h2 className="section-heading mt-3">The Best Deals. Only at CAATG.</h2>
                <p className="mt-4 text-sm text-silver-400">
                  Save on flagship smartphones, laptops, audio and more — for a limited time only.
                </p>
                <Link href="/deals" className="btn-gold mt-8">
                  View All Deals <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:min-w-[480px]">
                {deals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-y border-white/[0.06] py-14">
        <div className="container-apex">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest2 text-silver-600">
            Trusted Brands We Carry
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {brands.map((brand) => (
              <span key={brand} className="font-display text-lg font-semibold text-silver-600 transition-colors hover:text-silver-300">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
