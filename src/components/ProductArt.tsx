'use client';

import {
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
import { CategorySlug } from '@/lib/types';

const ICONS: Record<CategorySlug, LucideIcon> = {
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

const ACCENTS: Record<CategorySlug, 'gold' | 'silver'> = {
  smartphones: 'gold',
  laptops: 'silver',
  tablets: 'gold',
  gaming: 'silver',
  monitors: 'gold',
  audio: 'silver',
  smartwatches: 'gold',
  cameras: 'silver',
  accessories: 'gold',
  components: 'silver',
};

export function ProductArt({
  category,
  brand,
  variant = 0,
  className = '',
  showLabel = true,
}: {
  category: CategorySlug;
  brand?: string;
  variant?: number;
  className?: string;
  showLabel?: boolean;
}) {
  const Icon = ICONS[category];
  const accent = ACCENTS[category];
  const isGold = accent === 'gold';
  const rotation = [0, -6, 5, -3][variant % 4];
  const scale = [1, 1.08, 0.94, 1.04][variant % 4];
  const blobPos = [
    'top-[-10%] right-[-10%]',
    'bottom-[-10%] left-[-10%]',
    'top-[10%] left-[-15%]',
    'bottom-[-15%] right-[5%]',
  ][variant % 4];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-charcoal-lighter via-charcoal to-obsidian-950 ${className}`}
    >
      {/* Ambient glow blob */}
      <div
        className={`absolute h-1/2 w-1/2 rounded-full blur-3xl ${blobPos} ${
          isGold ? 'bg-gold-500/10' : 'bg-silver-400/10'
        }`}
      />
      {/* Circuit grid pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id={`grid-${category}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${category})`} className="text-silver-300" />
      </svg>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-4 sm:inset-6">
        <span className={`absolute left-0 top-0 h-4 w-4 border-l border-t ${isGold ? 'border-gold-500/40' : 'border-silver-400/40'}`} />
        <span className={`absolute right-0 top-0 h-4 w-4 border-r border-t ${isGold ? 'border-gold-500/40' : 'border-silver-400/40'}`} />
        <span className={`absolute bottom-0 left-0 h-4 w-4 border-b border-l ${isGold ? 'border-gold-500/40' : 'border-silver-400/40'}`} />
        <span className={`absolute bottom-0 right-0 h-4 w-4 border-b border-r ${isGold ? 'border-gold-500/40' : 'border-silver-400/40'}`} />
      </div>

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          strokeWidth={0.9}
          className={`h-[38%] w-[38%] transition-transform duration-700 ${
            isGold ? 'text-gold-400 drop-shadow-[0_0_25px_rgba(201,162,74,0.35)]' : 'text-silver-300 drop-shadow-[0_0_25px_rgba(199,202,209,0.25)]'
          }`}
          style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
        />
      </div>

      {showLabel && brand && (
        <div className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-widest2 text-silver-500">
          {brand}
        </div>
      )}
      {showLabel && (
        <div className={`absolute right-3 top-3 text-[9px] font-medium uppercase tracking-widest2 ${isGold ? 'text-gold-500/70' : 'text-silver-500/70'}`}>
          CAATG
        </div>
      )}
    </div>
  );
}
