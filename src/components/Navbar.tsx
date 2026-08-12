'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Monitor,
  Headphones,
  Watch,
  Camera,
  Cable,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from './Logo';
import { CategorySlug } from '@/lib/types';
import { SearchOverlay } from './SearchOverlay';
import { categories } from '@/lib/categories';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const PRIMARY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  smartphones: Smartphone,
  laptops: Laptop,
  tablets: Tablet,
  gaming: Gamepad2,
  monitors: Monitor,
  audio: Headphones,
  smartwatches: Watch,
  cameras: Camera,
  accessories: Cable,
  components: Cpu,
};

const QUICK_CATEGORY_LINKS = [
  { label: 'Smartphones', slug: 'smartphones' },
  { label: 'Laptops', slug: 'laptops' },
  { label: 'Tablets', slug: 'tablets' },
  { label: 'Gaming', slug: 'gaming' },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Audio', slug: 'audio' },
  { label: 'Smart Devices', slug: 'smartwatches' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();
  const { ids: wishlistIds } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled ? 'border-white/10 bg-obsidian-950/90 backdrop-blur-lg' : 'border-transparent bg-obsidian-950/40 backdrop-blur-sm'
        }`}
      >
        <div className="container-apex flex h-20 items-center justify-between gap-6">
          <Logo markClassName="h-8 w-8 sm:h-9 sm:w-9" size="sm" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {PRIMARY_LINKS.map((link) =>
              link.label === 'Shop' ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium uppercase tracking-wide text-silver-300 transition-colors hover:text-gold-400"
                  >
                    Shop <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  {shopOpen && (
                    <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4">
                      <div className="card-elevated grid grid-cols-2 gap-1 border-gold-800/30 p-4 shadow-elevated">
                        {categories.map((cat) => {
                          const Icon = CATEGORY_ICONS[cat.slug];
                          return (
                            <Link
                              key={cat.slug}
                              href={`/shop?category=${cat.slug}`}
                              className="flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/10 text-gold-400">
                                {Icon && <Icon className="h-4 w-4" />}
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-white">{cat.name}</span>
                                <span className="block text-[11px] text-silver-500">{cat.blurb}</span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-gold-400 ${
                    pathname === link.href ? 'text-gold-400' : 'text-silver-300'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center text-silver-300 transition-colors hover:text-gold-400"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-silver-300 transition-colors hover:text-gold-400 sm:flex"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-silver-300 transition-colors hover:text-gold-400"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistIds.length > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-obsidian-950">
                  {wishlistIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={openDrawer}
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center text-silver-300 transition-colors hover:text-gold-400"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-obsidian-950">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="ml-1 flex h-10 w-10 items-center justify-center text-silver-300 hover:text-gold-400 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick category strip (desktop) */}
        <div className="hidden border-t border-white/[0.06] lg:block">
          <div className="container-apex flex h-11 items-center gap-7 overflow-x-auto">
            {QUICK_CATEGORY_LINKS.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="whitespace-nowrap text-[11px] font-medium uppercase tracking-widest2 text-silver-500 transition-colors hover:text-gold-400"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[95] flex lg:hidden">
          <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm animate-fade-up flex-col bg-obsidian-900 shadow-elevated">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <Logo markClassName="h-8 w-8" size="sm" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-silver-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto p-5">
              {PRIMARY_LINKS.map((link) =>
                link.label === 'Shop' ? (
                  <div key={link.href} className="border-b border-white/5">
                    <button
                      onClick={() => setMobileShopOpen((v) => !v)}
                      className="flex w-full items-center justify-between py-3.5 text-sm font-medium uppercase tracking-wide text-silver-200"
                    >
                      Shop
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileShopOpen && (
                      <div className="flex flex-col gap-1 pb-3">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/shop?category=${cat.slug}`}
                            className="rounded-sm px-3 py-2 text-sm text-silver-400 hover:bg-white/[0.04] hover:text-gold-400"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-white/5 py-3.5 text-sm font-medium uppercase tracking-wide text-silver-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/account" className="flex items-center gap-3 text-sm text-silver-300 hover:text-gold-400">
                  <User className="h-4 w-4" /> Account
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 text-sm text-silver-300 hover:text-gold-400">
                  <Heart className="h-4 w-4" /> Wishlist {wishlistIds.length > 0 && `(${wishlistIds.length})`}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
