// Flag Card
"use client"

import { useState, forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { GameState, GameMode } from "@/types/game"
import type { Country } from "@/types/country"
import Image from "next/image"
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";

interface FlagCardProps {
  country: Country,
  gameState: GameState,
  gameMode: GameMode,
  onAnswer: (countryId: number, answer: string) => boolean // Modified return type
}

const FlagCard = forwardRef<{ resetInput: () => void }, FlagCardProps>(({ country, gameState, onAnswer, gameMode }, ref) => {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null)
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [resetCounter, setResetCounter] = useState<number>(0);
  const [dimensions, setDimensions] = useState({ width: 284, height: 260 });
  const refCard = useRef<HTMLDivElement>(null);

  const updateDimensions = useCallback(() => {
    if (!refCard.current) return;

    const card = refCard.current;
    const cardWidth = card.clientWidth - 32; // 32 = padding (16px * 2)
    
    // Calcular altura basada en aspect ratio 3:2
    const aspectRatio = 3/2;
    const cardHeight = Math.round(cardWidth / aspectRatio);

    // Ajustar altura máxima para evitar cards demasiado altas en pantallas grandes
    const maxHeight = Math.min(cardHeight, window.innerHeight * 0.4);

    setDimensions({
      width: cardWidth,
      height: maxHeight
    });
  }, []);

  useEffect(() => {
    if (!refCard.current) return;

    updateDimensions();

    // Crear ResizeObserver para actualizar dimensiones cuando la card cambie de tamaño
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(refCard.current);

    // Manejar cambios de orientación en dispositivos móviles
    const handleOrientation = () => {
      setTimeout(updateDimensions, 100);
    };
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, [updateDimensions]);

  useEffect(() => {
    setIsRevealed(false);
    setAnswer("");
    setHint(null);
    setAnswerStatus(null);
    setResetCounter(Date.now()); // Usar Date.now() para asegurar un valor único
  }, [country.id, gameMode]); // Agregar gameMode como dependencia

  useImperativeHandle(ref, () => ({
    resetInput: () => {
      setAnswer("");
      setHint(null);
      setAnswerStatus(null);
      setIsRevealed(false);
      // Forzar la recreación del componente ScratchToReveal
      setResetCounter(Date.now());
    },
  }));

  const handleShowHint = () => {
    if (!hint) {
      setHint(
        `First letter: ${country.name[0].toUpperCase()}, Length: ${country.name_length}, Continent: ${country.continent}`,
      )
    }
  }

  const handleSubmit = () => {
    if (gameState !== "playing" || !answer.trim()) return;
    const result = onAnswer(country.id, answer)
    setAnswerStatus(result ? "correct" : "incorrect")
  }

  return (
    <div 
      className="bg-card rounded-lg shadow-md p-4" 
      ref={refCard}
    >
      <ScratchToReveal
        key={resetCounter}
        className={`w-full mb-4 overflow-hidden rounded-md ${isRevealed ? 'pointer-events-none' : ''}`}
        aria-label={`Scratch to reveal flag for ${country.name}`}
        width={dimensions.width}
        height={dimensions.height}
        minScratchPercentage={70}
        gradientColors={isRevealed ? undefined : ["#A97CF8", "#F38CB8", "#FDCC92"]}
        onComplete={() => {
          if (!isRevealed) {
            setIsRevealed(true);
          }
        }}
      >
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            Flag image not available
          </div>
        ) : (
          <Image
            src={country.flag_url || "/placeholder.svg"}
            alt={`Flag of ${country.name}`}
            width={dimensions.width}
            height={dimensions.height}
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
        <Button onClick={handleSubmit} disabled={gameState !== "playing" || answerStatus === "correct"} size="sm">
          Check your answer
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

