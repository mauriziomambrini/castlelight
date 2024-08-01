import { useEffect, useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyTimes: Record<Difficulty, number> = {
  easy: 120, // 2 minuti (120 secondi)
  medium: 60, // 1 minuto (60 secondi)
  hard: 30, // 30 secondi
};

export const useCountdown = (difficulty: Difficulty) => {
  const [countdown, setCountdown] = useState(difficultyTimes[difficulty]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const formattedCountdown = formatTime(countdown);

  const startCountdown = () => {
    setCountdown(difficultyTimes[difficulty]);
  };

  const resetCountdown = () => {
    setCountdown(difficultyTimes[difficulty]);
  };

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  return { countdown: formattedCountdown, startCountdown, resetCountdown };
};
