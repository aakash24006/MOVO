'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaUtensils } from 'react-icons/fa'

export default function LoadingAnalysis() {

  const [progress, setProgress] = useState(0)

  const [message, setMessage] = useState(
    'Analyzing your workout...'
  )

  useEffect(() => {

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const next = prev + 1
        if (next < 35) {
          setMessage('Analyzing your workout...')
        } else if (next < 70) {
          setMessage('Calculating recovery needs...')
        } else {
          setMessage('Finding affordable options nearby...')
        }
        return next
      })
    }, 25)
    return () => clearInterval(interval)

  }, [])

  return (

    <div className="min-h-[500px] flex flex-col items-center justify-center">

      <motion.div

        animate={{
          rotate: 360
        }}

        transition={{
          repeat:Infinity,
          duration: 1.5,
          ease: 'linear'
        }}

        className="w-24 h-24 rounded-full border-4 border-white/10 border-t-[#34d399] flex items-center justify-center mb-8"
      >

        <FaUtensils
          size={28}
          className="text-[#34d399]"
        />

      </motion.div>

      <h2 className="text-2xl font-bold mb-3">

        {message}

      </h2>

      <p className="text-5xl font-black text-[#34d399]">

        {progress}%

      </p>

    </div>

  )

}