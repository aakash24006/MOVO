'use client'

const ITEMS = [
  '29g protein after leg day',
  'Lidl · 400m · €1.19',
  'evidence-based, not TikTok-based',
  '80g carbs · 600ml fluid',
  'Aldi · Rewe · Edeka',
  'four taps · thirty seconds',
  '€3.99/mo — student priced',
  'GDPR-first · EU hosted',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative border-y border-white/10 bg-white/[0.02] py-4 overflow-hidden">
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07070f] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07070f] to-transparent z-10" />

      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-sm text-slate-400 font-mono whitespace-nowrap"
          >
            <span className="text-emerald-400">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
