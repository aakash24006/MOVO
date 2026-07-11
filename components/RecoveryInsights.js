import RecoveryCard from './Recoverycard'

export default function RecoveryInsights({ recommendation }) {

  if (!recommendation) return null

  return (

    <div className="mt-10">

      <h2 className="text-4xl font-black mb-8">

        Recovery
        <span className="text-emerald-400">
          Insights
        </span>

      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <RecoveryCard
          title="Recovery Score"
          value="87%"
          subtitle="Excellent Recovery"
        />

        <RecoveryCard
          title="Protein"
          value={`${recommendation.protein}g`}
          subtitle="Muscle Recovery"
        />

        <RecoveryCard
          title="Carbohydrates"
          value={`${recommendation.carbs}g`}
          subtitle="Energy Replenishment"
        />

        <RecoveryCard
          title="Hydration"
          value={`${recommendation.water}ml`}
          subtitle="Fluid Optimization"
        />

      </div>

      {/* MEAL RECOMMENDATION */}
      <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 p-8 rounded-3xl">

        <h3 className="text-3xl font-bold mb-4 text-emerald-400">

          Recommended Recovery Meal

        </h3>

        <div className="space-y-3 text-lg">

          <p>
            🍌 Meal:
            <span className="text-white font-semibold ml-2">
              {recommendation.meal}
            </span>
          </p>

          <p>
            🛒 Store:
            <span className="text-white font-semibold ml-2">
              {recommendation.store}
            </span>
          </p>

          <p>
            💰 Estimated Cost:
            <span className="text-white font-semibold ml-2">
              {recommendation.cost}
            </span>
          </p>

        </div>

      </div>

    </div>

  )
}