"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { GameState } from "@/types/game"
import type { Country } from "@/types/country"
import Image from "next/image"
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";

interface FlagCardProps {
  country: Country
  gameState: GameState
  onAnswer: (countryId: number, answer: string) => boolean // Modified return type
}

const FlagCard = forwardRef<{ resetInput: () => void }, FlagCardProps>(({ country, gameState, onAnswer }, ref) => {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null)

  useImperativeHandle(ref, () => ({
    resetInput: () => {
      setAnswer("")
      setRevealed(false)
      setHint(null)
      setAnswerStatus(null)
    },
  }))

  const handleShowHint = () => {
    if (!hint) {
      setHint(
        `First letter: ${country.name[0].toUpperCase()}, Length: ${country.name_length}, Continent: ${country.continent}`,
      )
    }
  }

  const handleSubmit = () => {
    const result = onAnswer(country.id, answer)
    setAnswerStatus(result ? "correct" : "incorrect")
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
      <ScratchToReveal
        className="w-full aspect-[3/2] mb-4"
        aria-label={`Scratch to reveal flag for ${country.name}`}
        width={428}
        height={260}
        minScratchPercentage={70}
        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      >
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            Flag image not available
          </div>
        ) : (
          <Image
            src={country.flag_url || "/placeholder.svg"}
            alt={`Flag of ${country.name}`}
            width={300}
            height={200}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </ScratchToReveal>
      <label htmlFor={`answer-${country.id}`} className="sr-only">
        Enter country name
      </label>
      <Input
        id={`answer-${country.id}`}
        type="text"
        placeholder="Enter country name"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={gameState !== "playing" || answerStatus === "correct"}
        className={`mb-2 ${
          answerStatus === "correct"
            ? "border-green-500 bg-green-50"
            : answerStatus === "incorrect"
              ? "border-red-500 bg-red-50"
              : ""
        }`}
        aria-describedby={hint ? `hint-${country.id}` : undefined}
      />
      {answerStatus && ( // Added feedback message
        <p className={`text-sm ${answerStatus === "correct" ? "text-green-600" : "text-red-600"} mb-2`}>
          {answerStatus === "correct" ? "Correct!" : "Incorrect. Try again!"}
        </p>
      )}
      <div className="flex justify-between gap-2">
        <Button onClick={handleSubmit} disabled={gameState !== "playing"} size="sm">
          Submit
        </Button>
        <Button onClick={handleShowHint} disabled={gameState !== "playing" || revealed} size="sm" variant="outline">
          Hint
        </Button>
      </div>
      {hint && (
        <p id={`hint-${country.id}`} className="mt-2 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
})

FlagCard.displayName = "FlagCard"

export default FlagCard

