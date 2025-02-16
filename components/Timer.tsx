"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface TimerProps {
  duration: number
  onTimeUp: () => void
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      onTimeUp()
    }
  }, [timeLeft, onTimeUp])

  return (
    <div className="mb-4">
      <Progress value={(timeLeft / duration) * 100} className="w-full" />
      <p className="text-center mt-2">Time left: {timeLeft} seconds</p>
    </div>
  )
}

