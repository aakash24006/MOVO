export function calculateProfileStats(profile) {

  const weight = Number(profile.weight || 0)
  const heightCm = Number(profile.height || 0)

  // SAFE HEIGHT
  const height = heightCm > 0
    ? heightCm / 100
    : 1

  // BMI
  const bmi = weight > 0
    ? (weight / (height * height)).toFixed(1)
    : '--'

  // PROTEIN
  let proteinMultiplier = 1.6

  if (profile.goal === 'Muscle Gain') {
    proteinMultiplier = 2.2
  }

  if (profile.goal === 'Fat Loss') {
    proteinMultiplier = 1.8
  }

  if (profile.goal === 'Endurance') {
    proteinMultiplier = 1.5
  }

  const protein = weight > 0
    ? Math.round(weight * proteinMultiplier)
    : 0

  // WATER
  const hydration = weight > 0
    ? (weight * 0.035).toFixed(1)
    : 0

  // CALORIES
  let calories = weight > 0
    ? weight * 30
    : 0

  if (weight > 0) {

  if (profile.goal === 'Muscle Gain') {
    calories += 300
  }

  if (profile.goal === 'Fat Loss') {
    calories -= 300
  }

}

  calories = Math.round(calories)

  // RECOVERY
  let recovery = 80

  if (profile.goal === 'Recovery') {
    recovery += 10
  }

  if (profile.diet === 'High Protein') {
    recovery += 5
  }

  return {

    bmi,
    protein,
    hydration,
    calories,
    recovery

  }

}