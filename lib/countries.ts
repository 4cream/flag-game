import type { Country } from "@/types/country"
import { mockCountries } from "./mockData"

export async function getRandomCountries(count: number): Promise<Country[]> {
  // Shuffle the mock countries array
  const shuffled = [...mockCountries].sort(() => 0.5 - Math.random())
  // Return the first 'count' countries
  return shuffled.slice(0, count)
}

