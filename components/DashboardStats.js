'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../lib/firebase'
import { FaDumbbell, FaBolt, FaHeartbeat } from 'react-icons/fa'

function Metric({ icon: Icon, label, value, suffix, decimals = 0, hint, delay, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-emerald-400/40 transition-colors overflow-hidden"
    >
      <div className="absolute -top-14 -right-14 w-36 h-36 bg-emerald-400/0 group-hover:bg-emerald-400/12 blur-3xl rounded-full transition-all duration-500" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{label}</p>
          {loading ? (
            <div className="skeleton h-10 w-20 mb-1" />
          ) : (
            <p className="text-4xl font-black text-emerald-400">
              <CountUp end={value} decimals={decimals} duration={1.8} />
              {suffix}
            </p>
          )}
          <p className="text-slate-500 text-xs mt-1.5">{hint}</p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
          <Icon />
        </div>
      </div>
    </motion.div>
  )
}

export default function DashboardStats() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, avgFatigue: 0, score: 0 })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      const q = query(collection(db, 'workouts'), where('userId', '==', user.uid))
      const snapshot = await getDocs(q)
      const workouts = snapshot.docs.map((d) => d.data())

      const total = workouts.length
      const avgFatigue = total
        ? workouts.reduce((s, w) => s + Number(w.fatigue || 0), 0) / total
        : 0

      // same scoring rule as the recovery chart
      const score = total
        ? Math.max(
            0,
            Math.round(
              workouts.reduce((s, w) => {
                let r = 100 - Number(w.fatigue || 0) * 8
                if (w.intensity === 'High') r -= 10
                if (w.intensity === 'Medium') r -= 5
                return s + r
              }, 0) / total
            )
          )
        : 0

      setStats({ total, avgFatigue, score })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="grid sm:grid-cols-3 gap-5 mb-5">
      <Metric
        icon={FaDumbbell}
        label="Workouts logged"
        value={stats.total}
        hint="All time"
        delay={0.05}
        loading={loading}
      />
      <Metric
        icon={FaBolt}
        label="Avg fatigue"
        value={stats.avgFatigue}
        decimals={1}
        suffix=" / 5"
        hint="Across all sessions"
        delay={0.15}
        loading={loading}
      />
      <Metric
        icon={FaHeartbeat}
        label="Recovery score"
        value={stats.score}
        suffix="%"
        hint="Higher is better"
        delay={0.25}
        loading={loading}
      />
    </div>
  )
}
