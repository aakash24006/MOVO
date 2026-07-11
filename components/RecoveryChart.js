'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { db, auth } from '../lib/firebase'

export default function RecoveryChart() {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      const q = query(
        collection(db, 'workouts'),
        where('userId', '==', user.uid)
      )

      const snapshot = await getDocs(q)
      const workouts = snapshot.docs.map((doc) => doc.data())

      const formatted = workouts.map((item, index) => {
        let recovery = 100
        recovery -= Number(item.fatigue) * 8

        if (item.intensity === 'High') recovery -= 10
        if (item.intensity === 'Medium') recovery -= 5

        return {
          day: `W${index + 1}`,
          recovery,
        }
      })

      setChartData(formatted)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-3xl p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">Recovery analytics</h2>
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          score / workout
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="skeleton h-[240px] w-full rounded-2xl" />
          <div className="skeleton h-5 w-1/3" />
        </div>
      ) : chartData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📈</p>
          <p className="font-semibold mb-1">No data yet</p>
          <p className="text-slate-400 text-sm">
            Your recovery trend appears after your first logged workout.
          </p>
        </div>
      ) : (
        <div className="h-[320px] chart-glow">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="recoveryFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.25)"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: '#12121f',
                  border: '1px solid rgba(52,211,153,0.35)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                labelStyle={{ color: '#94a3b8' }}
                cursor={{ stroke: 'rgba(52,211,153,0.3)' }}
              />
              <Area
                type="monotone"
                dataKey="recovery"
                stroke="#34d399"
                strokeWidth={3}
                fill="url(#recoveryFill)"
                dot={{ fill: '#34d399', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#34d399' }}
                animationDuration={1400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}
