import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "red" | "dark" | "gold" | "light" | "outline";
  className?: string;
  size?: "sm" | "md";
};

const variants = {
  red: "bg-brand-red text-white",
  dark: "bg-ink text-cream",
  gold: "bg-brand-gold text-ink",
  light: "bg-cream text-ink border border-neutral-light",
  outline: "border border-current",
};

const sizes = {
  sm: "text-[10px] px-2 py-1",
  md: "text-xs px-3 py-1.5",
};

export default function Badge({ children, variant = "dark", className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium tracking-[0.12em] uppercase",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
