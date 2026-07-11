'use client'

import { useState } from 'react'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

import RecoveryInsights from './RecoveryInsights'

export default function WorkoutForm() {

  const [workout, setWorkout] = useState('')
  const [duration, setDuration] = useState('')
  const [intensity, setIntensity] = useState('Low')
  const [fatigue, setFatigue] = useState('')
  const [budget, setBudget] = useState('')

  const [recommendation, setRecommendation] = useState(null)

  const generateRecommendation = async () => {

    let protein = 20
    let carbs = 40

    if (intensity === 'High') {
      protein = 40
      carbs = 80
    }

    if (fatigue >= 4) {
      protein += 10
    }

    const water = 500 + duration * 10

    const recoveryPlan = {
      protein,
      carbs,
      water,
      meal: 'Protein Yogurt + Banana',
      store: 'Lidl',
      cost: '€1.79'
    }

    setRecommendation(recoveryPlan)

    try {

      await addDoc(collection(db, 'workouts'), {
        workout,
        duration,
        intensity,
        fatigue,
        budget,
        recoveryPlan,
        createdAt: new Date()
      })

      console.log('Workout Saved')

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl w-full">

      <h2 className="text-4xl font-black text-emerald-400 mb-8">
        Log Workout
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Workout Type"
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
        />

        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
        >

          <option className="bg-slate-900">
            Low
          </option>

          <option className="bg-slate-900">
            Medium
          </option>

          <option className="bg-slate-900">
            High
          </option>

        </select>

        <input
          type="number"
          placeholder="Fatigue Level (1-5)"
          value={fatigue}
          onChange={(e) => setFatigue(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
        />

        <input
          type="number"
          placeholder="Budget (€)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
        />

        <button
          onClick={generateRecommendation}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl transition shadow-2xl shadow-green-500/20"
        >

          Generate Recovery Plan

        </button>

      </div>

      <RecoveryInsights recommendation={recommendation} />

    </div>
  )
}