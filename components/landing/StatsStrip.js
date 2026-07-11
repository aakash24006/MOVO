'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const STATS = [
  {
    value: 1.8,
    suffix: '%',
    decimals: 1,
    label: 'of athletes know their optimal post-workout carbs',
    source: 'Nutrients, 2025',
  },
  {
    value: 87,
    suffix: '%',
    decimals: 0,
    label: 'of Gen-Z trust TikTok for nutrition advice',
    source: 'MyFitnessPal × DCU, 2024',
  },
  {
    value: 2.1,
    suffix: '%',
    decimals: 1,
    label: 'of that TikTok advice is actually accurate',
    source: 'MyFitnessPal × DCU, 2024',
  },
  {
    value: 198,
    prefix: '€',
    decimals: 0,
    label: 'monthly food budget needed for a high-supplement diet',
    source: 'Sozialerhebung, 2021',
  },
]

export default function StatsStrip() {
  return (
    <section id="problem" className="relative z-10 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">
            The recovery gap
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Students train hard.
            <br />
            <span className="text-slate-500">
              Their recovery nutrition is a mess.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Bad information, tight budgets, and zero structure — that&apos;s
            the gap between the gym and the fridge. MOVO closes it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 hover:border-emerald-400/40 transition-colors"
            >
              <p className="text-4xl md:text-5xl font-black text-emerald-400 mb-4">
                {s.prefix}
                <CountUp
                  end={s.value}
                  decimals={s.decimals}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {s.suffix}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                {s.label}
              </p>
              <p className="text-slate-600 text-xs font-mono">{s.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
