'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIRecoveryCoach() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askAI = async () => {
    if (!question) return

    try {
      setLoading(true)
      setResponse('')

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
        }),
      })

      const data = await res.json()
      setResponse(data.reply)
    } catch (error) {
      console.log(error)
      setResponse('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-3xl p-7 overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-400/8 blur-3xl rounded-full" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-black leading-tight">AI recovery coach</h2>
            <p className="text-xs text-slate-400 font-mono">
              evidence-based · no TikTok science
            </p>
          </div>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about recovery, hydration, protein…"
          className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none resize-none mt-4 mb-4 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 transition placeholder:text-slate-600"
        />

        <button
          onClick={askAI}
          disabled={loading}
          className="bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 text-black font-bold px-6 h-12 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Thinking…
            </span>
          ) : (
            'Ask coach →'
          )}
        </button>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 bg-emerald-400/5 border border-emerald-400/20 rounded-2xl p-5"
            >
              <p className="text-slate-200 leading-7 whitespace-pre-line text-sm">
                {response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
