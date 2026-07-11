'use client'

import { motion } from 'framer-motion'

export default function AuthLayout({ title, children }) {

  return (

    <main className="min-h-screen bg-slate-950 text-white flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-green-500/20 to-cyan-500/20">

        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full" />

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10 max-w-lg px-10"
        >

          <h1 className="text-7xl font-black leading-tight mb-8">

            Train.
            <br />
            Recover.
            <br />

            <span className="text-green-400">
              Perform.
            </span>

          </h1>

          <p className="text-xl text-slate-300 leading-relaxed">

            AI-powered recovery optimization for modern athletes and students.

          </p>

        </motion.div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl"
        >

          <h2 className="text-4xl font-bold mb-8 text-green-400">
            {title}
          </h2>

          {children}

        </motion.div>

      </div>

    </main>
  )
}