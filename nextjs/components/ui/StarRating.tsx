import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
  color?: "gold" | "red" | "dark";
};

const sizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const colors = {
  gold: "text-brand-gold",
  red: "text-brand-red",
  dark: "text-ink",
};

function Star({ filled, className }: { filled: number; className: string }) {
  return (
    <div className="relative inline-block">
      <svg viewBox="0 0 24 24" className={cn(className, "opacity-25")} aria-hidden>
        <path fill="currentColor" d="M12 2l3.1 6.3 7 1-5.05 4.9 1.2 6.9L12 17.8l-6.25 3.3 1.2-6.9L1.9 9.3l7-1L12 2z" />
      </svg>
      <svg viewBox="0 0 24 24" className={cn(className, "absolute inset-0")} style={{ clipPath: `inset(0 ${100 - filled * 100}% 0 0)` }} aria-hidden>
        <path fill="currentColor" d="M12 2l3.1 6.3 7 1-5.05 4.9 1.2 6.9L12 17.8l-6.25 3.3 1.2-6.9L1.9 9.3l7-1L12 2z" />
      </svg>
    </div>
  );
}

export default function StarRating({ rating, size = "md", showNumber, reviewCount, className, color = "gold" }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return <Star key={i} filled={fill} className={cn(sizes[size], colors[color])} />;
  });
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {stars}
      </div>
      {showNumber && (
        <span className="text-sm font-medium">
          {rating.toFixed(1)}
          {typeof reviewCount === "number" && (
            <span className="text-neutral-mid font-normal"> ({reviewCount.toLocaleString("en-GB")} reviews)</span>
          )}
        </span>
      )}
    </div>
  );
}
