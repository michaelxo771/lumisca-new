import PlaceholderImage from "@/components/ui/PlaceholderImage";

const TILES = [
  "@lucyskin — 10 weeks of Glow",
  "@jamesruns — Hair regrowth week 12",
  "@thewellnessedit — Morning routine",
  "@hollowayhair — Before / After",
  "@olivialondon — Glow check",
  "@restfulryan — Sleep kit",
];

export default function UGCStrip() {
  return (
    <section className="bg-ink text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
              Community
            </p>
            <h2 className="font-display text-display-lg">Join The Lumisca Community</h2>
          </div>
          <p className="text-cream/70 max-w-sm leading-relaxed">
            Tag <span className="text-brand-gold">@lumisca</span> for a chance to feature — and see real Lumisca routines from real UK customers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {TILES.map((t, i) => (
            <div key={i} className="relative group">
              <PlaceholderImage label={t} dark aspect="aspect-square" />
              <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-ink/80 via-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white/90">{t}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://tiktok.com/@lumisca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 h-14 border border-white/70 text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-white hover:text-ink transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d="M16 4c.6 2.2 2.6 3.8 5 4v3c-1.8 0-3.6-.5-5-1.4v6.5a6 6 0 11-6-6v3a3 3 0 103 3V4h3z" />
            </svg>
            Follow @lumisca On TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
