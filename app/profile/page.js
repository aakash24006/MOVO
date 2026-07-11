'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import DashboardLayout from '../../components/DashboardLayout'

const INPUT_CLASS =
  'w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 transition'

export default function ProfilePage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: '',
    sport: 'Football',
    age: '',
    weight: '',
    height: '',
    budget: '',
    goal: 'Performance',
  })

  useEffect(() => {
    // wait for Firebase to restore the session before loading the profile
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return

      const ref = doc(db, 'profiles', user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setProfile(snap.data())
      }
    })

    return () => unsubscribe()
  }, [])

  const saveProfile = async () => {
    if (!auth.currentUser) return

    setSaving(true)

    await setDoc(doc(db, 'profiles', auth.currentUser.uid), profile)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const protein = profile.weight ? Math.round(profile.weight * 1.8) : 0
  const hydration = profile.weight ? (profile.weight * 0.035).toFixed(1) : 0

  const field = (label, key, type = 'text', extra = {}) => (
    <div>
      <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={profile[key]}
        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
        className={INPUT_CLASS}
        {...extra}
      />
    </div>
  )

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            {profile.name ? (
              <>
                Hey, <span className="text-emerald-400">{profile.name.split(' ')[0]}</span>
              </>
            ) : (
              'Profile'
            )}
          </h1>
          <p className="text-slate-400">
            Personalised recovery settings — the engine adapts to these.
          </p>
        </div>

        {/* LIVE TARGETS */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group relative bg-white/[0.04] border border-white/10 rounded-3xl p-7 hover:border-emerald-400/40 transition-colors overflow-hidden"
          >
            <div className="absolute -top-14 -right-14 w-36 h-36 bg-emerald-400/0 group-hover:bg-emerald-400/10 blur-3xl rounded-full transition-all duration-500" />
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Daily protein target
            </p>
            <h2 className="text-5xl font-black text-emerald-400">
              <CountUp end={protein} duration={2} />g
            </h2>
            <p className="text-slate-500 text-xs font-mono mt-2">
              1.8g per kg bodyweight
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative bg-white/[0.04] border border-white/10 rounded-3xl p-7 hover:border-emerald-400/40 transition-colors overflow-hidden"
          >
            <div className="absolute -top-14 -right-14 w-36 h-36 bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-3xl rounded-full transition-all duration-500" />
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Hydration goal
            </p>
            <h2 className="text-5xl font-black text-emerald-400">
              <CountUp end={Number(hydration)} decimals={1} duration={2} />L
            </h2>
            <p className="text-slate-500 text-xs font-mono mt-2">
              35ml per kg bodyweight
            </p>
          </motion.div>
        </div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.04] border border-white/10 rounded-3xl p-7"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {field('Full name', 'name')}
            {field('Age', 'age', 'number')}
            {field('Weight (kg)', 'weight', 'number')}
            {field('Height (cm)', 'height', 'number')}
            {field('Weekly food budget (€)', 'budget', 'number')}

            <div>
              <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider">
                Primary sport
              </label>
              <select
                value={profile.sport}
                onChange={(e) =>
                  setProfile({ ...profile, sport: e.target.value })
                }
                className={INPUT_CLASS + ' bg-[#12121f]'}
              >
                <option>Football</option>
                <option>Volleyball</option>
                <option>Basketball</option>
                <option>Running</option>
                <option>Gym</option>
                <option>Cycling</option>
                <option>Tennis</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-7">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-black font-bold px-7 py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              {saving ? 'Saving…' : 'Save profile'}
            </button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-400 text-sm font-semibold flex items-center gap-2"
              >
                ✓ Saved — your targets updated
              </motion.span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
