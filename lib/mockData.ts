import type { Country } from "@/types/country"

export const mockCountries: Country[] = [
  {
    id: 1,
    name: "United States",
    alternative_names: ["USA", "America"],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/US.svg",
    continent: "North America",
    name_length: 13,
  },
  {
    id: 2,
    name: "France",
    alternative_names: [],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/FR.svg",
    continent: "Europe",
    name_length: 6,
  },
  {
    id: 3,
    name: "Japan",
    alternative_names: ["Nippon"],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/JP.svg",
    continent: "Asia",
    name_length: 5,
  },
  {
    id: 4,
    name: "Brazil",
    alternative_names: ["Brasil"],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/BR.svg",
    continent: "South America",
    name_length: 6,
  },
  {
    id: 5,
    name: "South Africa",
    alternative_names: [],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/ZA.svg",
    continent: "Africa",
    name_length: 12,
  },
  {
    id: 6,
    name: "Australia",
    alternative_names: [],
    flag_url: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/AU.svg",
    continent: "Oceania",
    name_length: 9,
  },
]

