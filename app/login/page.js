'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import VideoBackground from '../../components/fx/VideoBackground'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed. Check your email and password.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07070f] flex text-white overflow-hidden relative">
      <VideoBackground opacity={0.5} />
      {/* LEFT: brand panel */}
      <div className="hidden lg:flex w-1/2 relative z-10 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/15 blur-3xl rounded-full -top-20 -left-20 animate-drift" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full bottom-0 right-0 animate-drift-delayed" />

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-lg px-12"
        >
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-3xl font-black tracking-tight">
              MO<span className="text-emerald-400">VO</span>
            </span>
          </Link>
          <h1 className="text-6xl font-black leading-[1.08] tracking-tight mb-7">
            Train.
            <br />
            Recover.
            <br />
            <span className="text-shimmer">Perform.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Your recovery plan is waiting — macros, meals, and real prices
            near you.
          </p>
        </motion.div>
      </div>

      {/* RIGHT: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="lg:hidden absolute w-[300px] h-[300px] bg-emerald-500/12 blur-3xl rounded-full top-0 right-0" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="w-full max-w-md bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-9 shadow-2xl relative z-10"
        >
          <h2 className="text-3xl font-black mb-2">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">
            Log in to see your recovery dashboard.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@university.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 transition placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 transition placeholder:text-slate-600"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="animate-shake text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-black font-bold py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/20"
            >
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </div>

          <p className="text-sm text-slate-400 text-center mt-7">
            New to MOVO?{' '}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
