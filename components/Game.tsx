"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster, toast } from "sonner"
import type { GameMode, GameState, GameStats } from "@/types/game"
import type { Country } from "@/types/country"
import { getRandomCountries } from "@/lib/countries"
import FlagGrid from "./FlagGrid"
import Timer from "./Timer"
import Score from "./Score"
import RemainingFlags from "./RemainingFlags"
import Rules from "./Rules"
import { saveGameStats, getGameStats, INITIAL_GAME_STATS } from "@/lib/storage"
import { playSound } from "@/lib/sounds"
import Achievements from "./Achievements"
import InstructionsModal from "./InstructionsModal"
import { motion } from "framer-motion"
import AdPlaceholder from "./AdPlaceholder"
import Image from "next/image"

export default function Game() {
  const [gameMode, setGameMode] = useState<GameMode>("normal")
  const [gameState, setGameState] = useState<GameState>("initial")
  const [score, setScore] = useState(0)
  const [countries, setCountries] = useState<Country[]>([])
  const [remainingFlags, setRemainingFlags] = useState(0)
  const [stats, setStats] = useState<GameStats>(INITIAL_GAME_STATS)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const flagGridRef = useRef<{ resetInputs: () => void } | null>(null)

  useEffect(() => {
    setStats(getGameStats(gameMode))
  }, [gameMode])

  useEffect(() => {
    if (isFirstLoad) {
      toast.info("Welcome to Guess the Flag! Start guessing to begin the game.", {
        duration: 5000,
      })
      setIsFirstLoad(false)
      startNewGame()
    }
  }, [isFirstLoad])

  useEffect(() => {
    if (gameState !== "initial") {
      startNewGame();
    }
  }, [gameMode]); 

  const startNewGame = useCallback(async () => {
    
    const countryCount = gameMode === "normal" ? 4 : 6
    const newCountries = await getRandomCountries(countryCount)
    setCountries(newCountries)
    setGameState("playing")
    setScore(0)
    setRemainingFlags(countryCount)
    setStartTime(Date.now())
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    flagGridRef.current?.resetInputs()
    console.log(flagGridRef.current);
    
    toast.success("New game started!")
    playSound("start")
  }, [gameMode])

  const endGame = useCallback(() => {
    const endTime = Date.now()
    const gameTime = startTime ? (endTime - startTime) / 1000 : 0
    saveGameStats(gameMode, score, correctAnswers, incorrectAnswers, gameTime)
    setStats(getGameStats(gameMode))
    setGameState("gameOver")

    if (remainingFlags === 0) {
      toast.success("Congratulations! You won!")
      playSound("victory")
    } else {
      toast.error("Game over!")
      playSound("gameOver")
    }
  }, [gameMode, score, correctAnswers, incorrectAnswers, startTime, remainingFlags])

  useEffect(() => {
    if (gameState === "playing" && remainingFlags === 0) {
      endGame()
    }
  }, [remainingFlags, gameState, endGame])

  const handleAnswer = useCallback(
    (countryId: number, answer: string): boolean => {
      const country = countries.find((c) => c.id === countryId)
      if (country) {
        const isCorrect =
          country.name.toLowerCase() === answer.toLowerCase() ||
          country.alternative_names.some((name) => name.toLowerCase() === answer.toLowerCase())

        if (isCorrect) {
          setScore((prevScore) => prevScore + (gameMode === "normal" ? 25 : 25))
          setRemainingFlags((prev) => prev - 1)
          setCorrectAnswers((prev) => prev + 1)
          toast.success("Correct answer!")
          playSound("correct")
        } else if (gameMode === "hard") {
          setScore((prevScore) => Math.max(0, prevScore - 5))
          setIncorrectAnswers((prev) => prev + 1)
          toast.error("Incorrect answer. Try again!")
          playSound("incorrect")
        }
        return isCorrect
      }
      return false
    },
    [countries, gameMode],
  )

  return (
    <motion.div
      role="main"
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid gap-8 lg:grid-cols-1">
        <div className="max-w-[900px] mx-auto w-full">
          <Toaster richColors />
          <header className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <Image 
                src={"/images/flagmaster.png"}
                alt="Flag Master Logo"
                width={315}
                height={315}
              />

            {/* <h1 className="text-3xl font-bold mb-4 sm:mb-0">Guess the Flag</h1> */}
            
            <div className="flex gap-4 items-end justify-center flex-wrap">
              <div className="flex-[1_1_100%] sm:flex-auto">
                <label className="text-sm">Choose difficulty:</label>
                <Select onValueChange={(value: GameMode) => setGameMode(value)} value={gameMode}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select game mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={startNewGame}>New Game</Button>
              <Button variant="outline" onClick={() => setIsInstructionsOpen(true)}>
                Instructions
              </Button>
            </div>
          </header>
          {gameMode === "hard" && gameState === "playing" && <Timer duration={180} onTimeUp={endGame} />}
          <Score score={score} />
          <RemainingFlags count={remainingFlags} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FlagGrid
              ref={flagGridRef}
              gameMode={gameMode}
              gameState={gameState}
              countries={countries}
              onAnswer={handleAnswer}
            />
          </motion.div>
          <div className="mt-4 flex justify-between">
            <Button onClick={endGame} disabled={gameState !== "playing"}>
              End Game
            </Button>
            <Button variant="outline" onClick={startNewGame}>
              Reset Game
            </Button>
          </div>
          <Rules />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Stats</h2>
              <ul className="space-y-2">
                <li>Games Played: {stats.gamesPlayed}</li>
                <li>Total Score: {stats.totalScore}</li>
                <li>High Score: {stats.highScore}</li>
                <li>Correct Answers: {stats.totalCorrectAnswers}</li>
                <li>Incorrect Answers: {stats.totalIncorrectAnswers}</li>
                <li>Fastest Game: {stats.fastestGameTime ? `${stats.fastestGameTime.toFixed(2)}s` : "N/A"}</li>
              </ul>
            </div>
            <Achievements achievements={stats.achievements} />
          </div>
        </div>
        {/* <aside className="space-y-8">
          <AdPlaceholder />
          <AdPlaceholder />
        </aside> */}
      </div>
      <InstructionsModal isOpen={isInstructionsOpen} onClose={() => setIsInstructionsOpen(false)} />
    </motion.div>
  )
}

