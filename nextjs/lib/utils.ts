import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: "GBP" = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateSavings(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null;
  const saved = compareAt - price;
  const percentage = Math.round((saved / compareAt) * 100);
  return { saved, percentage };
}

export function getDispatchCountdown(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(15, 0, 0, 0);
  if (now >= cutoff) {
    cutoff.setDate(cutoff.getDate() + 1);
  }
  const diff = cutoff.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export function getDailyCountdown(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function getDeliveryDate(): string {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(15, 0, 0, 0);

  let delivery = new Date(now);
  const daysToAdd = now >= cutoff ? 4 : 3;
  delivery.setDate(delivery.getDate() + daysToAdd);

  while (delivery.getDay() === 0 || delivery.getDay() === 6) {
    delivery.setDate(delivery.getDate() + 1);
  }

  return delivery.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatTwoDigits(n: number) {
  return n.toString().padStart(2, "0");
}
