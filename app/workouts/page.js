'use client'

import DashboardLayout from '../../components/DashboardLayout'
import { motion } from 'framer-motion'
import Link from 'next/link'

const SPORTS = [
  {
    icon: '🏃',
    title: 'Running',
    desc: 'Endurance recovery optimisation — glycogen refill and fluid balance.',
    tag: 'Carb-focused',
  },
  {
    icon: '🏋️',
    title: 'Gym',
    desc: 'Muscle recovery & protein analysis tuned to your training split.',
    tag: 'Protein-focused',
  },
  {
    icon: '⚽',
    title: 'Football',
    desc: 'High-intensity recovery planning for mixed sprint and endurance load.',
    tag: 'Mixed macros',
  },
  {
    icon: '🚴',
    title: 'Cycling',
    desc: 'Long-session fueling with hydration and electrolyte planning.',
    tag: 'Fluid-focused',
  },
  {
    icon: '🏊',
    title: 'Swimming',
    desc: 'Full-body recovery with balanced macro and calorie targets.',
    tag: 'Balanced',
  },
  {
    icon: '🥊',
    title: 'Combat sports',
    desc: 'Recovery under weight-class constraints — precise, budget-aware.',
    tag: 'Precision',
  },
]

export default function WorkoutsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-black mb-3">Workouts</h1>
        <p className="text-slate-400 mb-10">
          Every sport recovers differently. Pick yours — the engine adapts.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {SPORTS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-[#12121f] border border-[#24243A] rounded-2xl p-6 hover:border-emerald-400/50 transition-colors overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-400/0 group-hover:bg-emerald-400/10 blur-3xl rounded-full transition-all duration-500" />
              <div className="relative">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                  {s.icon}
                </div>
                <h2 className="text-xl font-bold mb-2">{s.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <span className="inline-block text-[11px] font-mono text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
                  {s.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 bg-emerald-400/10 border border-emerald-400/25 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-bold mb-1">Just finished training?</p>
            <p className="text-slate-400 text-sm">
              Log it on the dashboard and get your recovery plan in 30 seconds.
            </p>
          </div>
          <Link href="/dashboard">
            <button className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-6 py-3 rounded-xl transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
              Log workout →
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
