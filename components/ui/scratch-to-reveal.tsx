"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"

interface ScratchToRevealProps {
  className?: string
  onReveal: () => void
  children: React.ReactNode
}

export const ScratchToReveal = ({ className, onReveal, children }: ScratchToRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const ctx = canvasRef.current?.getContext("2d")
      if (ctx) {
        ctx.clearRect(e.offsetX, e.offsetY, 20, 20)
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        const allPixelsRevealed = imageData.data.every((pixel, index) => index % 4 === 3 && pixel === 0)
        if (allPixelsRevealed) {
          onReveal()
          setIsRevealed(true)
        }
      }
    },
    [onReveal],
  )

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} onMouseDown={handleMouseDown} style={{ cursor: isRevealed ? "default" : "pointer" }} />
      {children}
    </div>
  )
}

