'use client'

import DashboardLayout from '../../components/DashboardLayout'
import RecoveryChart from '../../components/RecoveryChart'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-3"
          >
            Insights
          </motion.p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Analytics
          </h1>
          <p className="text-slate-400">
            Your recovery trend across every logged workout — higher is better.
          </p>
        </div>

        <RecoveryChart />
      </motion.div>
    </DashboardLayout>
  )
}
