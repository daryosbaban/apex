import { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    icon: 'Smartphone',
    blurb: 'Flagship phones from Apple, Samsung, Xiaomi & Sony',
    accent: 'gold',
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    icon: 'Laptop',
    blurb: 'Ultrabooks, creator machines and gaming laptops',
    accent: 'silver',
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    icon: 'Tablet',
    blurb: 'iPad, Galaxy Tab and more for work and play',
    accent: 'gold',
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    icon: 'Gamepad2',
    blurb: 'Consoles, handhelds and pro-grade peripherals',
    accent: 'silver',
  },
  {
    slug: 'monitors',
    name: 'Monitors',
    icon: 'Monitor',
    blurb: 'OLED, 4K and high-refresh displays',
    accent: 'gold',
  },
  {
    slug: 'audio',
    name: 'Headphones & Audio',
    icon: 'Headphones',
    blurb: 'Noise-cancelling headphones, earbuds & speakers',
    accent: 'silver',
  },
  {
    slug: 'smartwatches',
    name: 'Smartwatches',
    icon: 'Watch',
    blurb: 'Fitness, health and connectivity on your wrist',
    accent: 'gold',
  },
  {
    slug: 'cameras',
    name: 'Cameras',
    icon: 'Camera',
    blurb: 'Mirrorless, action cams and creator gear',
    accent: 'silver',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    icon: 'Cable',
    blurb: 'Chargers, cases, keyboards, mice and more',
    accent: 'gold',
  },
  {
    slug: 'components',
    name: 'Computer Components',
    icon: 'Cpu',
    blurb: 'GPUs, CPUs, memory, storage and power supplies',
    accent: 'silver',
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
