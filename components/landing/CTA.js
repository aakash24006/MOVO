'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <>
      <section className="relative z-10 py-28 px-6 overflow-hidden">
        <div className="absolute w-[700px] h-[400px] bg-emerald-500/12 blur-3xl rounded-full left-1/2 -translate-x-1/2 bottom-0" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center bg-white/[0.04] border border-white/10 rounded-[2.5rem] px-8 py-16 backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Your next workout
            <br />
            deserves a <span className="text-shimmer">real recovery.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Stop guessing from TikTok. Start recovering with evidence — on
            the budget you actually have.
          </p>
          <Link href="/signup">
            <button className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-10 py-5 rounded-2xl text-lg transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/30">
              Get started — it&apos;s free
            </button>
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-black text-white">
              MO<span className="text-emerald-400">VO</span>
            </span>
            <span className="ml-2">
              Smart recovery nutrition for students & amateur athletes
            </span>
          </div>
          <p className="font-mono text-xs">
            Built by six disciplines · Project-Based Learning · 2026
          </p>
        </div>
      </footer>
    </>
  )
}
