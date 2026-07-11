import { products } from '../pblic/data/products'

export function generateRecoveryPlan(data) {

  const {
    workoutType,
    intensity,
    fatigue,
    budget
  } = data

  const filteredProducts = products.filter(product =>

    product.suitableFor.includes(
      workoutType.toLowerCase()
    )

  )

  let selectedProducts = []

  let totalProtein = 0
  let totalCarbs = 0
  let totalHydration = 0
  let totalPrice = 0

  for (const product of filteredProducts) {

    if (
      totalPrice + product.price <= budget
    ) {

      selectedProducts.push(product)

      totalProtein += product.protein
      totalCarbs += product.carbs
      totalHydration += product.hydration
      totalPrice += product.price

    }

  }

  if (intensity === 'High') {
    totalProtein += 10
    totalHydration += 500
  }

  if (fatigue >= 4) {
    totalHydration += 300
  }

  const recoveryScore = Math.min(

    100,

    60 +
    totalProtein * 0.5 +
    totalHydration * 0.01 -
    fatigue * 5

  )

  return {

    products: selectedProducts,

    protein: Math.round(totalProtein),

    carbs: Math.round(totalCarbs),

    hydration: Math.round(totalHydration),

    price: totalPrice.toFixed(2),

    recoveryScore: Math.round(recoveryScore)

  }

}