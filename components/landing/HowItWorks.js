'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'You',
    desc: 'Sport, weight, and your real weekly budget. Set once.',
    tag: '5 seconds',
  },
  {
    n: '02',
    title: 'Workout',
    desc: 'Log type, intensity, and how wrecked you feel.',
    tag: '4 taps',
  },
  {
    n: '03',
    title: 'Engine',
    desc: 'Evidence-based rules compute your exact macros and a meal idea.',
    tag: 'Peer-reviewed',
  },
  {
    n: '04',
    title: 'Nearby',
    desc: 'A real product, at a real shop near you, at a real price.',
    tag: 'Lidl · Aldi · Rewe',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 py-28 px-6 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute w-[600px] h-[400px] bg-emerald-500/8 blur-3xl rounded-full left-1/2 -translate-x-1/2 top-0" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Four taps. One answer.
            <br />
            <span className="text-shimmer">Thirty seconds.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Decisions, not guesses.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {/* connector line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-emerald-400/60 origin-left"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.18, ease: 'easeOut' }}
              className="relative text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-[104px] h-[104px] mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-400/5 border border-white/10 group-hover:border-emerald-400/50 group-hover:bg-emerald-400/10 transition-all duration-300 group-hover:scale-110" />
                <span className="relative font-mono font-black text-2xl text-emerald-400">
                  {s.n}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[230px] mx-auto mb-3">
                {s.desc}
              </p>
              <span className="inline-block text-[11px] font-mono text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
                {s.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
