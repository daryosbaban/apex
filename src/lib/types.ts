export type CategorySlug =
  | 'smartphones'
  | 'laptops'
  | 'tablets'
  | 'gaming'
  | 'monitors'
  | 'audio'
  | 'smartwatches'
  | 'cameras'
  | 'accessories'
  | 'components';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export type Badge = 'New' | 'Bestseller' | 'Limited' | 'Editor\'s Pick' | 'Trending';

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: StockStatus;
  badge?: Badge;
  features: string[];
  specs: Record<string, string>;
  colorways?: string[];
  warranty: string;
  delivery: string;
  isFeatured?: boolean;
  releaseYear: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
  blurb: string;
  accent: 'gold' | 'silver';
}
