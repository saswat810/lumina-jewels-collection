import { Star } from "lucide-react";

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i <= Math.round(rating) ? "fill-gold" : "fill-transparent opacity-30"}
        />
      ))}
    </div>
  );
}
