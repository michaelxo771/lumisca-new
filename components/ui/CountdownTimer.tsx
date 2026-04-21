"use client";

import { useEffect, useState } from "react";
import { formatTwoDigits, getDailyCountdown, getDispatchCountdown } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  mode: "daily" | "dispatch";
  className?: string;
  theme?: "light" | "dark";
  labels?: boolean;
};

export default function CountdownTimer({ mode, className, theme = "dark", labels = true }: Props) {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const tick = () => setTime(mode === "daily" ? getDailyCountdown() : getDispatchCountdown());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mode]);

  if (!time) {
    return (
      <div className={cn("flex items-center gap-2 font-display text-3xl", className)} aria-hidden>
        <span>00</span>
        <span>:</span>
        <span>00</span>
        <span>:</span>
        <span>00</span>
      </div>
    );
  }

  const box = theme === "dark"
    ? "bg-white/10 text-white border border-white/15"
    : "bg-ink text-cream";
  const sep = theme === "dark" ? "text-white/50" : "text-ink/50";
  const label = theme === "dark" ? "text-white/60" : "text-neutral-mid";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {(["hours", "minutes", "seconds"] as const).map((unit, i) => (
        <div key={unit} className="flex items-center gap-2">
          <div className={cn("min-w-[70px] flex flex-col items-center py-3 px-4", box)}>
            <span className="font-display text-3xl md:text-4xl leading-none tabular-nums">
              {formatTwoDigits(time[unit])}
            </span>
            {labels && (
              <span className={cn("text-[10px] tracking-[0.15em] uppercase mt-1", label)}>
                {unit === "hours" ? "Hrs" : unit === "minutes" ? "Min" : "Sec"}
              </span>
            )}
          </div>
          {i < 2 && <span className={cn("font-display text-3xl md:text-4xl", sep)}>:</span>}
        </div>
      ))}
    </div>
  );
}
