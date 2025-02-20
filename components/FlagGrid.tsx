"use client"

import type { GameMode, GameState } from "@/types/game"
import type { Country } from "@/types/country"
import FlagCard from "./FlagCard"
import { forwardRef, useImperativeHandle, useRef } from "react"

interface FlagGridProps {
  gameMode: GameMode
  gameState: GameState
  countries: Country[]
  onAnswer: (countryId: number, answer: string) => boolean
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
        className={`grid gap-4 grid-cols-1 ${gameMode === "normal" ? "sm:grid-cols-2" : " sm:grid-cols-2 md:grid-cols-3"}`}
      >
        {countries.map((country, index) => (
          <FlagCard
            key={country.id}
            ref={(el) => { flagCardRefs.current[index] = el }}
            country={country}
            gameState={gameState}
            onAnswer={onAnswer}
            gameMode={gameMode}
          />
        ))}
      </div>
    )
  },
)

FlagGrid.displayName = "FlagGrid"

export default FlagGrid

