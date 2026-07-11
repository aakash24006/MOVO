'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import MultiStepForm from '../../components/MultiStepForm'
import RecoveryChart from '../../components/RecoveryChart'
import WorkoutHistory from '../../components/WorkoutHistory'
import AIRecoveryCoach from '../../components/AIRecoveryCoach'
import DashboardStats from '../../components/DashboardStats'
import dynamic from 'next/dynamic'

const StoreMap = dynamic(() => import('../../components/StoreMap'), {
  ssr: false,
})

export default function DashboardPage() {
  const [globalLoading, setGlobalLoading] = useState(false)

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-7xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 mb-2"
          >
            {greeting} 👋
          </motion.p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Recovery <span className="text-emerald-400">dashboard</span>
          </h1>
        </div>

        {/* METRICS */}
        <DashboardStats />

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* LEFT */}
          <div className="space-y-5">
            <MultiStepForm
              globalLoading={globalLoading}
              setGlobalLoading={setGlobalLoading}
            />
            <WorkoutHistory />
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {!globalLoading && (
              <>
                <RecoveryChart />
                <StoreMap />
              </>
            )}
          </div>
        </div>

        {/* COACH */}
        <div className="mt-5">
          <AIRecoveryCoach />
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
