import { questions as allQuestions } from '@/data/questions';
import type {
  DifficultyTypes,
  QuestionTypes,
  QuizContextTypes,
} from '@/types/quizTypes';
import { createContext, useEffect, useState } from 'react';

// Constants
const TOTAL_IMAGES = 6;
const IMAGE_TRIGGER = 2; // Must be a third of TOTAL_IMAGES
const TIME_REDUCTION = 5;
const DIFFICULTY_TIMES: Record<DifficultyTypes, number> = {
  easy: 60, // seconds
  medium: 45,
  hard: 30,
};

// Creazione del contesto
export const QuizContext = createContext<QuizContextTypes | undefined>(
  undefined,
);

interface IQuizProvider {
  children: React.ReactNode;
}

// Funzione per randomizzare e limitare le domande
const getRandomQuestions = (
  questions: QuestionTypes[],
  limit: number,
): QuestionTypes[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

const QuizProvider = ({ children }: IQuizProvider) => {
  const [difficulty, setDifficulty] = useState<DifficultyTypes | undefined>(
    undefined,
  );
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [level, setLevel] = useState(0);
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);

  const question = questions[currentQuestion];

  useEffect(() => {
    const selectedQuestions = getRandomQuestions(allQuestions, TOTAL_IMAGES);
    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    if (difficulty) {
      const reduction = level * TIME_REDUCTION;
      const newCountdown = DIFFICULTY_TIMES[difficulty] - reduction;
      setCountdown(newCountdown > 0 ? newCountdown : 0);
    }
  }, [difficulty, level]);

  useEffect(() => {
    if (countdown !== undefined && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev !== undefined && prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  if (countdown === 0 && showImage) {
    setShowImage(false);
    setQuizStarted(true);
  }

  const startQuiz = () => {
    setShowImage(true);
    setQuizStarted(true);
    setCountdown(DIFFICULTY_TIMES[difficulty!]);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentImage(currentImage + 1);

      if ((currentImage + 1) % IMAGE_TRIGGER === 0) {
        setLevel((prevLevel) => prevLevel + 1);
      }
    } else {
      setQuizStarted(false);
    }
  };

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
        currentImage,
        totalImages: TOTAL_IMAGES,
        level,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
