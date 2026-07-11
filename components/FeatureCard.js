'use client'

import { motion } from 'framer-motion'
import TiltCard from './fx/TiltCard'

export default function FeatureCard({ title, description, icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
    <TiltCard max={8}>
    <div
      className="group relative bg-white/[0.04] border border-white/10 backdrop-blur-xl p-8 rounded-3xl transition-colors duration-300 hover:border-emerald-400/50 overflow-hidden"
    >
      {/* hover glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-400/0 group-hover:bg-emerald-400/15 blur-3xl rounded-full transition-all duration-500" />

      <div className="relative">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400 text-2xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {icon}
          </div>
        )}

        <h3 className="text-xl font-bold mb-3">{title}</h3>

        <p className="text-slate-400 leading-relaxed text-[15px]">
          {description}
        </p>
      </div>
    </div>
    </TiltCard>
    </motion.div>
  )
}
