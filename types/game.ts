export type GameMode = "normal" | "hard"
export type GameState = "initial" | "playing" | "submitted" | "gameOver" | "victory"

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
}

export interface GameStats {
  gamesPlayed: number
  totalScore: number
  highScore: number
  totalCorrectAnswers: number
  totalIncorrectAnswers: number
  fastestGameTime: number | null
  achievements: Achievement[]
}

