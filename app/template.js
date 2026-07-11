'use client'

import { motion } from 'framer-motion'

/* Next.js re-mounts template.js on every navigation,
   so this gives us a smooth page transition for free. */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
