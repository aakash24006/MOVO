'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../lib/firebase'

const INTENSITY_STYLE = {
  High: 'text-red-400 bg-red-400/10 border-red-400/25',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
}

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // wait for Firebase to restore the session before fetching,
    // otherwise a hard refresh shows "no workouts" even when data exists
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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setWorkouts(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-3xl p-7"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">Workout history</h2>
        {workouts.length > 0 && (
          <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
            {workouts.length} logged
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-[74px] w-full rounded-2xl" />
          ))}
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🏋️</p>
          <p className="font-semibold mb-1">No workouts yet</p>
          <p className="text-slate-400 text-sm">
            Log your first session above to start tracking recovery.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {workouts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
              whileHover={{ x: 4 }}
              className="bg-white/[0.03] border border-white/10 hover:border-emerald-400/30 rounded-2xl p-4 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{item.workout}</h3>
                <span
                  className={`text-xs font-semibold border rounded-full px-3 py-1 ${
                    INTENSITY_STYLE[item.intensity] || INTENSITY_STYLE.Low
                  }`}
                >
                  {item.intensity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-slate-400 text-xs">Fatigue</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`w-4 h-1.5 rounded-full ${
                        n <= Number(item.fatigue)
                          ? 'bg-emerald-400'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-500 text-xs">{item.fatigue}/5</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
