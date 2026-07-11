'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaChartLine,
  FaSignOutAlt,
} from 'react-icons/fa'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import VideoBackground from './fx/VideoBackground'
import { auth } from '../lib/firebase'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: FaHome },
  { href: '/profile', label: 'Profile', icon: FaUser },
  { href: '/workouts', label: 'Workouts', icon: FaDumbbell },
  { href: '/analytics', label: 'Analytics', icon: FaChartLine },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [email, setEmail] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setEmail(user?.email || null))
    return () => unsub()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    window.location.href = '/login'
  }

  return (
    <main className="noise min-h-screen bg-[#07070f] text-white flex relative overflow-hidden">
      <VideoBackground opacity={0.35} />
      <div className="light-beam" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] bg-emerald-500/8 blur-3xl rounded-full -top-40 right-0 animate-drift" />
      <div className="pointer-events-none absolute w-[400px] h-[400px] bg-cyan-500/6 blur-3xl rounded-full bottom-0 left-1/3 animate-drift-delayed" />

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex w-72 bg-[#0b0b16]/90 backdrop-blur-xl border-r border-white/10 p-8 flex-col justify-between relative z-10"
      >
        <div>
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 mb-14 group w-fit">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-3xl font-black tracking-tight">
              MO<span className="text-emerald-400">VO</span>
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-2">
            {NAV.map(({ href, label, icon: Icon }, i) => {
              const active = pathname === href
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                >
                  <Link href={href}>
                    <div
                      className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group ${
                        active
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/25'
                          : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-400 rounded-r-full"
                        />
                      )}
                      <Icon
                        className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                          active ? '' : 'group-hover:text-emerald-400'
                        }`}
                      />
                      <p>{label}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>

        {/* ACCOUNT + LOGOUT */}
        <div>
          {email && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-3 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3"
            >
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">
                Logged in as
              </p>
              <p className="text-xs text-emerald-400 font-semibold truncate">{email}</p>
            </motion.div>
          )}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-200"
        >
          <FaSignOutAlt />
          <p>Logout</p>
        </motion.button>
        </div>
      </motion.aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-40 bg-[#0b0b16]/90 backdrop-blur-xl border-b border-white/10 px-5 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-xl font-black">
            MO<span className="text-emerald-400">VO</span>
          </span>
        </Link>
        <div className="flex gap-1">
          {NAV.map(({ href, icon: Icon }) => (
            <Link key={href} href={href}>
              <div
                className={`p-2.5 rounded-lg transition ${
                  pathname === href
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-slate-400'
                }`}
              >
                <Icon />
              </div>
            </Link>
          ))}
          <button onClick={handleLogout} className="p-2.5 text-slate-400 hover:text-red-400">
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 md:p-10 pt-20 lg:pt-10 overflow-y-auto relative z-10">
        {children}
      </section>
    </main>
  )
}
