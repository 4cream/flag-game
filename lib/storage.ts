import type { GameMode } from "@/types/game"

export interface GameStats {
  gamesPlayed: number
  totalScore: number
  highScore: number
  totalCorrectAnswers: number
  totalIncorrectAnswers: number
  fastestGameTime: number | null
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "first_win", name: "First Win", description: "Win your first game", unlocked: false },
  {
    id: "perfect_game",
    name: "Perfect Game",
    description: "Win a game without any incorrect answers",
    unlocked: false,
  },
  { id: "speed_demon", name: "Speed Demon", description: "Win a hard mode game in under 1 minute", unlocked: false },
  { id: "globe_trotter", name: "Globe Trotter", description: "Play 50 games", unlocked: false },
]

export const INITIAL_GAME_STATS: GameStats = {
  gamesPlayed: 0,
  totalScore: 0,
  highScore: 0,
  totalCorrectAnswers: 0,
  totalIncorrectAnswers: 0,
  fastestGameTime: null,
  achievements: INITIAL_ACHIEVEMENTS,
}

export function saveGameStats(
  mode: GameMode,
  score: number,
  correctAnswers: number,
  incorrectAnswers: number,
  gameTime: number,
) {
  if (typeof window === "undefined") return

  const key = `flagGame_${mode}Stats`
  const storedStats = localStorage.getItem(key)
  let stats: GameStats

  if (storedStats) {
    stats = JSON.parse(storedStats)
    stats.gamesPlayed += 1
    stats.totalScore += score
    stats.highScore = Math.max(stats.highScore, score)
    stats.totalCorrectAnswers += correctAnswers
    stats.totalIncorrectAnswers += incorrectAnswers
    stats.fastestGameTime = stats.fastestGameTime ? Math.min(stats.fastestGameTime, gameTime) : gameTime

    // Update achievements
    if (!stats.achievements.find((a) => a.id === "first_win")?.unlocked && score > 0) {
      stats.achievements.find((a) => a.id === "first_win")!.unlocked = true
    }
    if (incorrectAnswers === 0 && score > 0) {
      stats.achievements.find((a) => a.id === "perfect_game")!.unlocked = true
    }
    if (mode === "hard" && gameTime < 60 && score > 0) {
      stats.achievements.find((a) => a.id === "speed_demon")!.unlocked = true
    }
    if (stats.gamesPlayed >= 50) {
      stats.achievements.find((a) => a.id === "globe_trotter")!.unlocked = true
    }
  } else {
    stats = {
      ...INITIAL_GAME_STATS,
      gamesPlayed: 1,
      totalScore: score,
      highScore: score,
      totalCorrectAnswers: correctAnswers,
      totalIncorrectAnswers: incorrectAnswers,
      fastestGameTime: gameTime,
    }
  }

  localStorage.setItem(key, JSON.stringify(stats))
}

export function getGameStats(mode: GameMode): GameStats {
  if (typeof window === "undefined") return INITIAL_GAME_STATS

  const key = `flagGame_${mode}Stats`
  const storedStats = localStorage.getItem(key)

  if (storedStats) {
    return JSON.parse(storedStats)
  }

  return INITIAL_GAME_STATS
}

