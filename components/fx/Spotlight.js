'use client'

import { useEffect, useState } from 'react'

/* mouse-following radial glow over the whole page */
export default function Spotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(52,211,153,0.055), transparent 55%)`,
      }}
    />
  )
}
