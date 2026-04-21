import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  dark?: boolean;
  aspect?: string;
  children?: React.ReactNode;
};

export default function PlaceholderImage({ label, className, dark, aspect = "aspect-square", children }: Props) {
  return (
    <div
      className={cn(
        "ph-box flex items-center justify-center text-center p-6",
        aspect,
        dark && "dark",
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="w-8 h-8 opacity-60"
          aria-hidden
        >
          <rect x="4" y="4" width="32" height="32" strokeDasharray="3 3" />
          <circle cx="14" cy="14" r="2.5" />
          <path d="M4 28l9-8 7 6 6-4 10 6" />
        </svg>
        <span className="text-xs tracking-[0.18em] uppercase font-medium">{label}</span>
        {children}
      </div>
    </div>
  );
}
