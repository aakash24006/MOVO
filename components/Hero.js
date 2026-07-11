'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import MagneticButton from './fx/MagneticButton'

const Hero3D = dynamic(() => import('./fx/Hero3D'), { ssr: false })

/* ---------- auto-playing product demo card ---------- */

const PHASES = ['input', 'engine', 'result']

function DemoCard() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timings = [2600, 2200, 4200]
    const t = setTimeout(
      () => setPhase((p) => (p + 1) % PHASES.length),
      timings[phase]
    )
    return () => clearTimeout(t)
  }, [phase])

  const current = PHASES[phase]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 to-cyan-400/20 blur-2xl rounded-[2rem]" />

      <div className="relative bg-[#12121f]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-float">
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Live recovery
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">Lukas · 24</span>
        </div>

        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            {current === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <p className="text-sm text-slate-400 mb-4">Workout logged</p>
                {[
                  ['Sport', 'Gym · Strength'],
                  ['Duration', '60 min'],
                  ['Intensity', 'High'],
                  ['Fatigue', '4 / 5'],
                  ['Budget', '€4.00'],
                ].map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12 }}
                    className="flex justify-between items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-xs text-slate-400">{k}</span>
                    <span className="text-sm font-semibold">{v}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {current === 'engine' && (
              <motion.div
                key="engine"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center h-[240px] gap-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1">Recovery engine</p>
                  <p className="text-xs text-slate-400 font-mono">
                    matching macros · meals · local prices
                  </p>
                </div>
              </motion.div>
            )}

            {current === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-sm text-slate-400 mb-4">Your recovery plan</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    [29, 'g', 'protein'],
                    [80, 'g', 'carbs'],
                    [600, 'ml', 'fluid'],
                  ].map(([n, unit, label]) => (
                    <div
                      key={label}
                      className="bg-white/5 border border-white/5 rounded-xl px-2 py-3 text-center"
                    >
                      <p className="text-xl font-black text-emerald-400">
                        <CountUp end={n} duration={1.2} />
                        <span className="text-xs font-normal">{unit}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm">Magerquark + Banane</p>
                    <span className="text-emerald-400 font-black text-sm">€1.19</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Lidl · 400 m away · well within budget ✓
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* phase dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {PHASES.map((p, i) => (
            <span
              key={p}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === phase ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- hero ---------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    // skip the 3D scene for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShow3D(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -90])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid" />
      <div className="aurora" />
      <div className="absolute w-[560px] h-[560px] bg-emerald-500/15 blur-3xl rounded-full -top-32 -left-32 animate-drift" />
      <div className="absolute w-[460px] h-[460px] bg-cyan-500/10 blur-3xl rounded-full bottom-0 right-0 animate-drift-delayed" />

      {/* cinematic 3D layer — only rendered while the hero is on screen */}
      {show3D && (
        <motion.div style={{ opacity: orbOpacity }} className="absolute inset-0">
          <Hero3D />
        </motion.div>
      )}

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full"
      >
        {/* left: copy */}
        <motion.div style={{ y: yCopy }} variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300 font-mono tracking-wide">
              Smart recovery nutrition for students
            </span>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,4.6vw,4.25rem)] font-black leading-[1.08] tracking-tight mb-6">
            {[
              { words: ['Train', 'hard.'], cls: 'text-white' },
              { words: ['Recover', 'smarter.'], cls: 'text-shimmer' },
              { words: ['Powered', 'by', 'AI.'], cls: 'text-slate-500' },
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden pb-1 whitespace-nowrap">
                {line.words.map((w, wi) => (
                  <motion.span
                    key={wi}
                    initial={{ opacity: 0, y: '70%', filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + li * 0.22 + wi * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block mr-[0.22em] ${line.cls}`}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="text-slate-400 text-lg max-w-xl mb-9 leading-relaxed"
          >
            MOVO turns your workout into an exact recovery plan — macros, a
            meal idea, and a real product at a real supermarket near you.
            Four taps. Thirty seconds. On a student budget.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link href="/signup">
              <MagneticButton className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-emerald-500/30">
                Start recovering →
              </MagneticButton>
            </Link>
            <Link href="/login">
              <MagneticButton className="border border-white/15 hover:border-emerald-400/60 hover:bg-white/5 px-8 py-4 rounded-2xl text-lg">
                Live demo
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="flex gap-8 mt-12 text-sm text-slate-500"
          >
            <div>
              <p className="text-2xl font-black text-white">30s</p>
              <p>to a full plan</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">€3.99</p>
              <p>per month</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">20+</p>
              <p>verified products</p>
            </div>
          </motion.div>
        </motion.div>

        {/* right: live demo */}
        <motion.div style={{ y: yCard }}>
          <DemoCard />
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em]">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-emerald-400 to-transparent"
        />
      </motion.div>
    </section>
  )
}
