'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const FREE = [
  'Recovery basics after every workout',
  'General nutrition guidance',
  'Workout history',
]

const PREMIUM = [
  'Personalised macros — protein, carbs, fluid',
  'Meal ideas matched to your budget',
  'Real products & prices at shops near you',
  'AI recovery coach',
  'Recovery analytics & trends',
]

function Check() {
  return (
    <svg
      className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Cheaper than one scoop
            <br />
            <span className="text-slate-500">of whey you don&apos;t need.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* free */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col"
          >
            <p className="font-mono text-sm text-slate-400 uppercase tracking-widest mb-3">
              Free
            </p>
            <p className="text-5xl font-black mb-6">
              €0
              <span className="text-base font-normal text-slate-500">
                {' '}/ forever
              </span>
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3 text-slate-300 text-sm">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mt-auto">
              <button className="w-full border border-white/15 hover:border-emerald-400/60 hover:bg-white/5 py-3.5 rounded-2xl font-semibold transition">
                Start free
              </button>
            </Link>
          </motion.div>

          {/* premium */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-gradient-to-b from-emerald-400/15 to-[#12121f] border border-emerald-400/40 rounded-3xl p-8 flex flex-col animate-pulse-glow"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full">
              Most popular
            </span>
            <p className="font-mono text-sm text-emerald-400 uppercase tracking-widest mb-3">
              Premium
            </p>
            <p className="text-5xl font-black mb-1">
              €3.99
              <span className="text-base font-normal text-slate-400">
                {' '}/ month
              </span>
            </p>
            <p className="text-xs text-slate-400 font-mono mb-6">
              60% cheaper than MyFitnessPal Premium
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {PREMIUM.map((f) => (
                <li key={f} className="flex gap-3 text-slate-200 text-sm">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mt-auto">
              <button className="w-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold py-3.5 rounded-2xl transition-transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/25">
                Go premium →
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
