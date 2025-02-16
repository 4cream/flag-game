const sounds = {
  start: "/sounds/start.mp3",
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
  victory: "/sounds/victory.mp3",
  gameOver: "/sounds/game-over.mp3",
}

export function playSound(soundType: keyof typeof sounds) {
  const audio = new Audio(sounds[soundType])
  audio.play().catch((error) => console.error("Error playing sound:", error))
}

