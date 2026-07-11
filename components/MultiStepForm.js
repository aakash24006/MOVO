
'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import LoadingAnalysis from './LoadingAnalysis'

import CountUp from 'react-countup'

import NearbyStores from './NearbyStores'

export default function MultiStepForm({
  globalLoading,
  setGlobalLoading
}) {

  const [step, setStep] = useState(1)

  const [selectedWorkout, setSelectedWorkout] = useState('')

  const [intensity, setIntensity] = useState('')

  const [fatigue, setFatigue] = useState(5)


  const [products, setProducts] = useState([])

const [aiAdvice, setAiAdvice] = useState('')

const [duration, setDuration] = useState('')

const [budget, setBudget] = useState('')

const recommendedProtein =
  intensity === 'High'
    ? 35
    : intensity === 'Medium'
    ? 30
    : 25

const recoveryScore =
  Number(fatigue) >= 8
    ? 65
    : Number(fatigue) >= 5
    ? 82
    : 95

  const generateRecommendation = async () => {


const response = await fetch('/Products.json')

const data = await response.json()

const filteredProducts = data.products
  .filter(
    item => item.retail_price <= Number(budget)
  )
  .sort(
    (a, b) =>
      parseFloat(b.total_protein_per_package) -
      parseFloat(a.total_protein_per_package)
  )
  .slice(0, 5)

setProducts(filteredProducts)
const aiResponse = await fetch('/api/recovery', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workout: selectedWorkout,
    duration,
    intensity,
    fatigue,
    budget
  })
})

const aiData = await aiResponse.json()

setAiAdvice(aiData.result)
    
    setGlobalLoading(true)

    setTimeout(() => {

      setGlobalLoading(false)

      setStep(5)

    }, 2810)
  }

  if (globalLoading) {
    return <LoadingAnalysis />
  }

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.35 }}

      className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-7"
    >

      {/* TOP */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="text-slate-400 text-sm mb-1">
            Recovery Assessment
          </p>

          <h2 className="text-3xl font-black">
            Workout Recovery
          </h2>

        </div>

        <div className="text-right">

          <p className="text-[#34d399] text-sm font-semibold">
  {step === 5 ? 'Results' : `Step ${step} / 4`}
</p>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mb-8 -mt-4">
        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2">
          {['Workout', 'Intensity', 'Fatigue', 'Budget'].map((label, i) => (
            <span
              key={label}
              className={`text-[10px] font-mono uppercase tracking-wider transition-colors duration-300 ${
                step > i ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="space-y-6"
        >

          <div>

            <h3 className="text-2xl font-bold mb-5">
              What workout did you do?
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {[
                'Running',
                'Gym',
                'Cycling',
                'Football'
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setSelectedWorkout(item)}
                  className={`
                    h-14
                    rounded-lg
                    border
                    transition-all
                    duration-200
                    font-semibold
                    ${selectedWorkout === item
                      ? 'bg-[#34d399] text-black border-[#34d399]'
                      : 'bg-[#0b0b16] border-white/10 hover:border-[#34d399]'}
                  `}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>
          
              <div className="mt-6">

  <label className="block text-slate-400 mb-2">
    Workout Duration (minutes)
  </label>

  <input
    type="number"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    placeholder="e.g. 45"
    className="
      w-full
      bg-[#0b0b16]
      border
      border-white/10
      rounded-lg
      p-4
    "
  />

</div>

          <div className="flex justify-end">

            <button
              onClick={() => setStep(2)}
              disabled={!selectedWorkout}
              className="
                bg-[#34d399]
                text-black
                font-bold
                px-7
                h-12
                rounded-lg
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-200
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              Continue
            </button>

          </div>

        </motion.div>

      )}

      {/* STEP 2 */}
      {step === 2 && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="space-y-6"
        >

          <div>

            <h3 className="text-2xl font-bold mb-5">
              Workout intensity?
            </h3>

            <div className="grid grid-cols-3 gap-4">

              {['Low', 'Medium', 'High'].map((item) => (

                <button
                  key={item}
                  onClick={() => setIntensity(item)}
                  className={`
                    h-14
                    rounded-lg
                    border
                    transition-all
                    duration-200
                    font-semibold
                    ${intensity === item
                      ? 'bg-[#34d399] text-black border-[#34d399]'
                      : 'bg-[#0b0b16] border-white/10 hover:border-[#34d399]'}
                  `}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          <div className="flex justify-between">

            <button
              onClick={() => setStep(1)}
              className="bg-[#0b0b16] border border-white/10 px-6 h-12 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              disabled={!intensity}
              className="
                bg-[#34d399]
                text-black
                font-bold
                px-7
                h-12
                rounded-lg
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-200
                disabled:opacity-40
              "
            >
              Continue
            </button>

          </div>

        </motion.div>

      )}

      {/* STEP 3 */}
      {step === 3 && (

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="space-y-6"
        >

          <div>

            <h3 className="text-2xl font-bold mb-5">
              Fatigue level
            </h3>

            <input
              type="range"
              min="1"
              max="10"
              value={fatigue}
              onChange={(e) => setFatigue(e.target.value)}
              className="w-full accent-[#34d399]"
            />

            <div className="flex justify-between text-slate-400 text-sm mt-2">

              <p>1</p>

              <p className="text-[#34d399] font-bold text-lg">
                {fatigue}
              </p>

              <p>10</p>

            </div>

          </div>

          <div className="mt-6">

  <label className="block text-slate-400 mb-2">
    Food Budget (€)
  </label>

  <input
    type="number"
    value={budget}
    onChange={(e) => setBudget(e.target.value)}
    placeholder="e.g. 30"
    className="
      w-full
      bg-[#0b0b16]
      border
      border-white/10
      rounded-lg
      p-4
    "
  />

</div>

          <div className="flex justify-between">

            <button
              onClick={() => setStep(2)}
              className="bg-[#0b0b16] border border-white/10 px-6 h-12 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={generateRecommendation}
              className="
                bg-[#34d399]
                text-black
                font-bold
                px-7
                h-12
                rounded-lg
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-200
              "
            >
              Analyse Recovery
            </button>

          </div>

        </motion.div>

      )}


{/* STEP 5 */}
{step === 5 && (



  <motion.div

    initial={{ opacity: 0 }}

    animate={{ opacity: 1 }}

    className="space-y-6"
  >

    {/* RECOVERY CARD */}
    <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-7">

      <p className="text-slate-400 mb-2">
        Recommended Recovery
      </p>

      <h3 className="text-3xl font-black text-[#34d399] mb-3">

        High Protein Recovery Meal

      </h3>

      <p className="text-slate-300 leading-7">

        Based on your workout intensity and fatigue,
        focus on hydration, protein replenishment,
        and light mobility recovery.

      </p>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-5">

    <p className="text-slate-400 text-sm mb-2">
      Protein
    </p>

    <h3 className="text-3xl font-black text-[#34d399]">
      <CountUp
        end={recommendedProtein}
        duration={2}
      />
      g
    </h3>

  </div>

  <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-5">

    <p className="text-slate-400 text-sm mb-2">
      Hydration
    </p>

    <h3 className="text-3xl font-black text-[#34d399]">
      <CountUp
        end={2.5}
        decimals={1}
        duration={2}
      />
      L
    </h3>

  </div>

  <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-5">

    <p className="text-slate-400 text-sm mb-2">
      Recovery Score
    </p>

    <h3 className="text-3xl font-black text-[#34d399]">
      <CountUp
        end={recoveryScore}
        duration={2}
      />
      %
    </h3>

  </div>

</div>
    {/* PRODUCTS */}
    <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-6">

      <h3 className="text-2xl font-black mb-5">

        Recommended Products

      </h3>

      <div className="space-y-4">

        {products?.length > 0 && products.map((item, index) => (

          <div

            key={index}

            className="flex items-center justify-between border border-white/10 rounded-xl p-4"
          >

            <div>

              <h4 className="font-bold text-lg">

                {item.product_name}

              </h4>

              <p className="text-slate-400 text-sm">

                {item.supermarket}

              </p>

            </div>

            <div className="text-right">

              <p className="text-[#34d399] font-bold">

                {item.total_protein_per_package}

              </p>

              <p className="text-slate-400 text-sm">

                €{item.retail_price}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

    <div className="bg-[#0b0b16] border border-white/10 rounded-2xl p-6">

  <h3 className="text-2xl font-black text-[#34d399] mb-4">
    AI Recovery Coach
  </h3>

  {aiAdvice ? (

    <p className="text-slate-300 leading-8 whitespace-pre-line">
      {aiAdvice}
    </p>

  ) : (

    <p className="text-slate-500">
      Generating recovery insights...
    </p>

  )}

<NearbyStores />


</div>


</motion.div>

)}

</motion.div>

  )}




