import { questions as allQuestions } from '@/data/questions'; // Importiamo tutte le domande
import type {
  DifficultyTypes,
  QuestionTypes,
  QuizContextTypes,
} from '@/types/quizTypes';
import { type ReactNode, createContext, useEffect, useState } from 'react';

// Definizione delle variabili
const totalImages = 2;
const imageTrigger = 1;
const difficultyTimes: Record<DifficultyTypes, number> = {
  easy: 120, // 2 minuti
  medium: 90, // 1.5 minuto
  hard: 10, // 1 minuto
};

// Creiamo il contesto
export const QuizContext = createContext<QuizContextTypes | undefined>(
  undefined,
);

interface IQuizProvider {
  children: ReactNode;
}

// Funzione per randomizzare e limitare le domande
const getRandomQuestions = (
  questions: QuestionTypes[],
  limit: number,
): QuestionTypes[] => {
  // Ordina le domande in modo casuale e le limita al numero desiderato
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};

const QuizProvider = (props: IQuizProvider) => {
  const { children } = props;
  const [difficulty, setDifficulty] = useState<DifficultyTypes | undefined>(
    undefined,
  );
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);

  const question = questions[currentQuestion];

  useEffect(() => {
    const selectedQuestions = getRandomQuestions(allQuestions, totalImages);
    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    if (difficulty) {
      setCountdown(difficultyTimes[difficulty] - (level - 1) * 10);
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
    setCountdown(difficultyTimes[difficulty!]);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentImage(currentImage + 1);

      if ((currentImage + 1) % imageTrigger === 0) {
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
        totalImages,
        level,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
