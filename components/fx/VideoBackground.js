'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * Fullscreen ambient video background.
 * - stays fixed while the page scrolls (classic "video site" feel)
 * - dark overlay keeps text readable
 * - falls back to a static gradient if the video fails or the user prefers reduced motion
 * - swap the video by replacing /public/bg-ambient.mp4 with any mp4
 */
export default function VideoBackground({ opacity = 0.55, overlay = true }) {
  const videoRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    // some browsers pause autoplay videos on load; nudge it
    if (enabled && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [enabled])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {enabled && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setEnabled(false)}
          style={{ opacity }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg-ambient.mp4" type="video/mp4" />
        </video>
      )}

      {/* readability overlay + vignette */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-[#07070f]/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 30%, rgba(7,7,15,0.75) 100%)',
            }}
          />
        </>
      )}
    </div>
  )
}
