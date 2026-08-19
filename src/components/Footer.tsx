import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Deals', href: '/deals' },
];

const CATEGORY_LINKS = [
  { label: 'Smartphones', href: '/shop?category=smartphones' },
  { label: 'Laptops', href: '/shop?category=laptops' },
  { label: 'Gaming', href: '/shop?category=gaming' },
  { label: 'Audio', href: '/shop?category=audio' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

const SERVICE_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'FAQ', href: '/faq' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-obsidian-950">
      <div className="container-apex grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo showTagline markClassName="h-9 w-9" size="md" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-500">
            CAATG LTD is a premium technology and electronics retailer bringing customers authentic devices,
            trusted brands and a shopping experience built to the highest standard.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">Quick Links</h4>
          <ul className="mt-5 flex flex-col gap-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-silver-400 transition-colors hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">Categories</h4>
          <ul className="mt-5 flex flex-col gap-3">
            {CATEGORY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-silver-400 transition-colors hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">Customer Service</h4>
          <ul className="mt-5 flex flex-col gap-3">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-silver-400 transition-colors hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-5 text-sm text-silver-500">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold-500" /> +44 7348 258677
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gold-500" /> support@caatgltd.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold-500" /> Leeds, LS15 0AS, UK
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-apex flex flex-col items-center justify-between gap-3 py-6 text-xs text-silver-600 sm:flex-row">
          <p>&copy; 2026 CAATG LTD. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
