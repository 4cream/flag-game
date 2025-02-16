import type { Metadata } from "next"
import Game from "@/components/Game"

export const metadata: Metadata = {
  title: "Guess the Flag Game",
  description: "Test your knowledge of world flags in this exciting guessing game!",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guess the Flag</h1>
      <Game />
    </main>
  )
}

