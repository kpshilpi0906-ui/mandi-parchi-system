// Dalal Parchi Calculations
export const calculateDalalAmount = (noOfBags: number, rate: number): number => {
  return noOfBags * rate
}

// Toll Parchi Calculations
export const calculateTollTotalKg = (bags50kg: number, looseKg: number): number => {
  return (bags50kg * 50) + looseKg
}

export const calculateTollQuintal = (totalKg: number): number => {
  return totalKg / 100
}

export const calculateTollAmount = (quintal: number, rate: number): number => {
  return quintal * rate
}

// Bardana Calculations
export const calculateActualBags = (bardanaTaken: number, deposit: number): number => {
  return bardanaTaken - deposit
}
