'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#07070f]/80 border-b border-white/10 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-2xl font-black tracking-tight">
            MO<span className="text-emerald-400">VO</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-sm text-slate-300">
          <a href="#problem" className="nav-link hover:text-emerald-400 transition pb-1">Why</a>
          <a href="#how" className="nav-link hover:text-emerald-400 transition pb-1">How it works</a>
          <a href="#features" className="nav-link hover:text-emerald-400 transition pb-1">Features</a>
          <a href="#pricing" className="nav-link hover:text-emerald-400 transition pb-1">Pricing</a>
        </div>

        <div className="flex gap-3 items-center">
          <Link href="/login" className="text-sm text-slate-300 hover:text-white transition px-3 py-2">
            Log in
          </Link>
          <Link href="/signup">
            <button className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
