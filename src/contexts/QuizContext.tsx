import { questions as allQuestions } from '@/data/questions'; // Importiamo tutte le domande
import type { DifficultyTypes, QuestionType } from '@/types/quizTypes';
import { type ReactNode, createContext, useEffect, useState } from 'react';

interface QuizContextType {
  difficulty: DifficultyTypes | undefined;
  countdown: number | undefined;
  currentQuestion: number;
  question: QuestionType | undefined;
  showImage: boolean;
  quizStarted: boolean;
  userAnswers: string[];
  startQuiz: () => void;
  handleAnswer: (answer: string) => void;
  setDifficulty: (level: DifficultyTypes) => void;
  calculateScore: () => { score: number; successRate: number };
}

// Creiamo il contesto
export const QuizContext = createContext<QuizContextType | undefined>(
  undefined,
);

interface QuizProviderProps {
  children: ReactNode;
}

// Funzione per randomizzare e limitare le domande
const getRandomQuestions = (
  questions: QuestionType[],
  limit: number,
): QuestionType[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

export function QuizProvider({ children }: QuizProviderProps) {
  const [difficulty, setDifficulty] = useState<DifficultyTypes | undefined>(
    undefined,
  );
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  // Otteniamo 9 domande casuali
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    setQuestions(getRandomQuestions(allQuestions, 9));
  }, []);

  const question = questions[currentQuestion];

  const difficultyTimes: Record<DifficultyTypes, number> = {
    easy: 120, // 2 minuti
    medium: 60, // 1 minuto
    hard: 30, // 30 secondi
  };

  useEffect(() => {
    if (difficulty) {
      setCountdown(difficultyTimes[difficulty]);
    }
  }, [difficulty]);

  useEffect(() => {
    if (countdown !== undefined && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev !== undefined ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  const startQuiz = () => {
    setShowImage(true);
    setQuizStarted(false);
    setCountdown(difficultyTimes[difficulty!]);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCountdown(difficultyTimes[difficulty!]);
      startQuiz();
    } else {
      setQuizStarted(false);
    }
  };

  if (countdown === 0 && showImage) {
    setShowImage(false);
    setQuizStarted(true);
  }

  const calculateScore = () => {
    const correctAnswers = questions.map((q) => q.answer);
    const score = userAnswers.filter(
      (answer, index) => answer === correctAnswers[index],
    ).length;
    const successRate = (score / questions.length) * 100;
    return { score, successRate };
  };

  return (
    <QuizContext.Provider
      value={{
        difficulty,
        countdown,
        currentQuestion,
        question,
        showImage,
        quizStarted,
        userAnswers,
        startQuiz,
        handleAnswer,
        setDifficulty,
        calculateScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
