export function getBestStore(products, userBudget) {

  const stores = [

    {
      name: 'Lidl',
      distance: 0.8,
      priceModifier: -1
    },

    {
      name: 'Aldi',
      distance: 1.2,
      priceModifier: -0.5
    },

    {
      name: 'Rewe',
      distance: 2.1,
      priceModifier: 1.5
    },

    {
      name: 'Edeka',
      distance: 1.7,
      priceModifier: 0.8
    }

  ]

  const totalPrice = products.reduce(

    (sum, item) => sum + item.price,
    0

  )

  const rankedStores = stores.map((store) => {

    const estimatedPrice =
      totalPrice + store.priceModifier

    let score = 100

    // budget optimization
    if (estimatedPrice > userBudget) {

      score -= 25

    }

    // distance optimization
    score -= store.distance * 10

    return {

      ...store,
      estimatedPrice: estimatedPrice.toFixed(2),
      score

    }

  })

  rankedStores.sort((a, b) => b.score - a.score)

  return rankedStores
}