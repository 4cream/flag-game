interface ScoreProps {
  score: number
}

export default function Score({ score }: ScoreProps) {
  return <div className="text-2xl font-bold text-center mb-4">Score: {score}</div>
}

