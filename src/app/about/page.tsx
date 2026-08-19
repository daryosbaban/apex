import type { Metadata } from 'next';
import { Target, Eye, Award, Package, Smile } from 'lucide-react';
import { LogoMarkOnly } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about CAATG LTD — a modern technology and electronics retailer built on trust, quality and premium service.',
};

const PILLARS = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make premium technology accessible by offering authentic devices, competitive pricing and a shopping experience customers can trust — every time.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To become a leading name in electronics retail, recognized for reliability, product expertise and an unwavering commitment to customer satisfaction.',
  },
  {
    icon: Award,
    title: 'Why CAATG',
    text: 'We partner directly with trusted global brands, rigorously vet every product, and back every purchase with real warranty and support — no shortcuts.',
  },
  {
    icon: Package,
    title: 'Our Products',
    text: 'From flagship smartphones and laptops to gaming, audio, wearables and components — our catalog spans everyday essentials to professional-grade gear.',
  },
  {
    icon: Smile,
    title: 'Customer Experience',
    text: 'Every touchpoint, from browsing to checkout to after-sales support, is designed around clarity, speed and genuine care for our customers.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-dark-radial">
      <section className="border-b border-white/[0.06] py-24">
        <div className="container-apex flex flex-col items-center gap-6 text-center">
          <LogoMarkOnly className="h-16 w-16" />
          <span className="eyebrow">About CAATG LTD</span>
          <h1 className="max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl">
            Technology retail, <span className="gold-text">reimagined.</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-silver-400 sm:text-base">
            CAATG LTD is a modern technology and electronics retailer focused on bringing customers quality devices,
            trusted brands, competitive pricing and a premium shopping experience. We offer a wide selection of
            electronics and technology products for everyday users, professionals, gamers and businesses.
          </p>
        </div>
      </section>

      <section className="container-apex py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-elevated p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-700/30 text-gold-400">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-silver-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="container-apex grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            ['10+', 'Product Categories'],
            ['500+', 'Products Curated'],
            ['50K+', 'Happy Customers'],
            ['14', 'Trusted Global Brands'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">{value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-silver-500">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
