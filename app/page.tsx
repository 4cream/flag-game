import type { Metadata } from "next"
import Game from "@/components/Game"

export const metadata: Metadata = {
  title: "The Flag Game",
  description: "Test your knowledge of world flags in this exciting guessing game!",
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? ''
  }
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guess the Flag</h1>
      <Game />
    </main>
  )
}

