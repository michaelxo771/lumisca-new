export type Money = {
  amount: number;
  currencyCode: "GBP";
};

export type ProductImage = {
  src: string;
  alt: string;
  placeholder?: string;
};

export type Product = {
  id: string;
  handle: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: "hair" | "face" | "eye" | "bundle";
  badge?: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
  benefitIcons: { icon: string; title: string; description: string }[];
  inTheBox: string[];
  howToUse: string[];
  specs: { label: string; value: string }[];
  timeline: { week: string; title: string; description: string }[];
  stats: { value: string; label: string }[];
  images: ProductImage[];
  stock: number;
  soldLast24h: number;
  viewingNow: number;
  featured?: boolean;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  productHandle: string;
  verified: boolean;
  date: string;
};

export type NavLink = {
  label: string;
  href: string;
};
