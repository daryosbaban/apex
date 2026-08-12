import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Smartphone, Laptop, Gamepad2, Headphones, Watch, Camera } from 'lucide-react';

const FLOATING_ICONS = [
  { Icon: Smartphone, style: 'left-[8%] top-[18%]', delay: '0s' },
  { Icon: Laptop, style: 'right-[10%] top-[12%]', delay: '0.6s' },
  { Icon: Gamepad2, style: 'left-[14%] bottom-[14%]', delay: '1.1s' },
  { Icon: Headphones, style: 'right-[16%] bottom-[22%]', delay: '0.3s' },
  { Icon: Watch, style: 'left-[46%] top-[6%]', delay: '0.9s' },
  { Icon: Camera, style: 'right-[38%] bottom-[8%]', delay: '1.4s' },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-dark-radial">
      {/* Background grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" className="text-silver-300" />
      </svg>

      {/* Floating device glyphs */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {FLOATING_ICONS.map(({ Icon, style, delay }, i) => (
          <div
            key={i}
            className={`absolute ${style} opacity-[0.12]`}
            style={{ animation: `fadeUp 1.2s ease forwards`, animationDelay: delay }}
          >
            <Icon className="h-16 w-16 text-silver-300" strokeWidth={0.75} />
          </div>
        ))}
      </div>

      {/* Radial glows */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold-500/[0.08] blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-silver-400/[0.06] blur-[120px]" />

      <div className="container-apex relative z-10 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="fade-up eyebrow mb-6 flex items-center gap-2 rounded-full border border-gold-700/30 px-4 py-1.5" style={{ animationDelay: '0.05s' }}>
            The Premium Electronics Destination
          </span>
          <h1
            className="fade-up font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
            style={{ animationDelay: '0.15s' }}
          >
            Technology
            <br />
            at Its <span className="gold-text text-shadow-glow">Apex.</span>
          </h1>
          <p className="fade-up mt-7 max-w-xl text-base leading-relaxed text-silver-400 sm:text-lg" style={{ animationDelay: '0.3s' }}>
            Discover the latest smartphones, laptops, gaming devices and electronics — all in one place.
          </p>
          <div className="fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.45s' }}>
            <Link href="/shop" className="btn-gold">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop" className="btn-outline">
              <Play className="h-3.5 w-3.5" /> Explore Products
            </Link>
          </div>

          <div className="fade-up mt-16 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8" style={{ animationDelay: '0.6s' }}>
            <div>
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">500+</p>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-silver-500">Products</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">50K+</p>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-silver-500">Customers</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">4.8/5</p>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-silver-500">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-obsidian-950 to-transparent" />
    </section>
  );
}
