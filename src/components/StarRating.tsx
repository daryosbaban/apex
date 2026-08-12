import { Star } from 'lucide-react';

export function StarRating({
  rating,
  reviewCount,
  size = 'sm',
}: {
  rating: number;
  reviewCount?: number;
  size?: 'xs' | 'sm' | 'md';
}) {
  const starSize = size === 'md' ? 'h-4 w-4' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-3 w-3';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              className={`${starSize} ${filled ? 'fill-gold-400 text-gold-400' : 'fill-transparent text-silver-700'}`}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="text-xs text-silver-500">
        {rating.toFixed(1)}
        {typeof reviewCount === 'number' && <span className="text-silver-600"> ({reviewCount.toLocaleString()})</span>}
      </span>
    </div>
  );
}
