"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "red" | "dark" | "outline" | "outline-light" | "ghost" | "gold";
type Size = "sm" | "md" | "lg" | "xl";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const variantStyles: Record<Variant, string> = {
  red: "bg-brand-red text-white hover:bg-[#a40d25] active:bg-[#8c0b1f] shadow-soft",
  dark: "bg-ink text-cream hover:bg-[#1a1a1a] shadow-soft",
  outline: "border border-ink text-ink hover:bg-ink hover:text-cream",
  "outline-light": "border border-white/70 text-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:bg-ink/5",
  gold: "bg-brand-gold text-ink hover:bg-[#b8993f] shadow-soft",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
  xl: "h-[60px] px-10 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase transition-all duration-200 rounded-none select-none min-w-[44px] min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonAsButton | ButtonAsLink>(
  ({ variant = "dark", size = "md", className, fullWidth, children, ...rest }, ref) => {
    const classes = cn(
      base,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );
    if ("href" in rest && rest.href) {
      const { href, target, rel, ...anchorRest } = rest as ButtonAsLink;
      const external = href.startsWith("http");
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target ?? (external ? "_blank" : undefined)}
          rel={rel ?? (external ? "noopener noreferrer" : undefined)}
          className={classes}
          {...anchorRest}
        >
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as ButtonAsButton)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
