'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* button that gently pulls toward the cursor */
export default function MagneticButton({ children, className = '', strength = 0.35, ...props }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: x * strength, y: y * strength })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* shine sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <span className="relative">{children}</span>
    </motion.button>
  )
}
