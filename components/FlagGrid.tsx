"use client"

import type { GameMode, GameState } from "@/types/game"
import type { Country } from "@/types/country"
import FlagCard from "./FlagCard"
import { forwardRef, useImperativeHandle, useRef } from "react"

interface FlagGridProps {
  gameMode: GameMode
  gameState: GameState
  countries: Country[]
  onAnswer: (countryId: number, answer: string) => void
}

const FlagGrid = forwardRef<{ resetInputs: () => void }, FlagGridProps>(
  ({ gameMode, gameState, countries, onAnswer }, ref) => {
    const flagCardRefs = useRef<Array<{ resetInput: () => void } | null>>([])

    useImperativeHandle(ref, () => ({
      resetInputs: () => {
        flagCardRefs.current.forEach((cardRef) => cardRef?.resetInput())
      },
    }))

    return (
      <div
        className={`grid gap-4 ${gameMode === "normal" ? "grid-cols-2 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
      >
        {countries.map((country, index) => (
          <FlagCard
            key={country.id}
            ref={(el) => (flagCardRefs.current[index] = el)}
            country={country}
            gameState={gameState}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    )
  },
)

FlagGrid.displayName = "FlagGrid"

export default FlagGrid

