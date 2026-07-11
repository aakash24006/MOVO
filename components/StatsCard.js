'use client'

import { motion } from 'framer-motion'

export default function StatsCard({ title, value, subtitle, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white/[0.04] border border-white/10 backdrop-blur-xl p-7 rounded-3xl hover:border-emerald-400/40 transition-colors overflow-hidden"
    >
      <div className="absolute -top-14 -right-14 w-36 h-36 bg-emerald-400/0 group-hover:bg-emerald-400/10 blur-3xl rounded-full transition-all duration-500" />
      <div className="relative">
        <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">{title}</p>
        <h2 className="text-5xl font-black text-emerald-400 mb-2">{value}</h2>
        <p className="text-slate-300 text-sm">{subtitle}</p>
      </div>
    </motion.div>
  )
}
