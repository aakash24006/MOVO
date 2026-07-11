'use client'

import { useState } from 'react'

export default function AIChat() {

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    if (!message) return

    setLoading(true)

    try {

      const res = await fetch('/api/chat', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          message
        })

      })

      const data = await res.json()

      setResponse(data.reply)

    } catch (error) {

      console.log(error)

    }

    setLoading(false)
  }

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-emerald-400 mb-6">

        AI Recovery Coach

      </h2>

      <textarea
        placeholder="Ask anything about recovery, hydration, workouts..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 p-5 rounded-2xl bg-black/30 border border-white/10 outline-none text-white"
      />

      <button
        onClick={sendMessage}
        className="mt-5 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-4 rounded-2xl transition"
      >

        {loading ? 'Thinking...' : 'Ask AI'}

      </button>

      {response && (

        <div className="mt-8 bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-3xl p-6">

          <p className="text-slate-200 whitespace-pre-line leading-relaxed">

            {response}

          </p>

        </div>

      )}

    </div>
  )
}