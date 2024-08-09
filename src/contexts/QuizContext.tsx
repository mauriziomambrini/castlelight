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
  easy: 45, // seconds
  medium: 30,
  hard: 15,
};

// Create the Quiz context
export const QuizContext = createContext<QuizContextTypes | undefined>(
  undefined,
);

interface IQuizProvider {
  children: React.ReactNode;
}

// Randomize and limit the questions
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
  const [reduction, setReduction] = useState(0);
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);

  const question = questions[currentQuestion];

  // Start quiz
  const startQuiz = () => {
    const initialTime = DIFFICULTY_TIMES[difficulty!] - reduction;

    setShowImage(true);
    setQuizStarted(true);
    setCountdown(initialTime);
  };

  // Side effect to handle showing or hiding the image and managing countdown
  useEffect(() => {
    if (countdown === 0 && showImage) {
      setShowImage(false);
    }
  }, [countdown, showImage]);

  // Set random questions on component mount
  useEffect(() => {
    const selectedQuestions = getRandomQuestions(allQuestions, TOTAL_IMAGES);
    setQuestions(selectedQuestions);
  }, []);

  // Set reduction based on the level
  useEffect(() => {
    if (level === 0) return;
    const newReduction = level * TIME_REDUCTION;
    setReduction(newReduction);
  }, [level]);

  // Adjust countdown time based on difficulty and reduction when the level changes
  useEffect(() => {
    if (!difficulty || countdown === undefined) return;
    const timeLeft = DIFFICULTY_TIMES[difficulty] - level * TIME_REDUCTION;
    setCountdown(timeLeft);
  }, [level, difficulty]);

  // Handle countdown logic
  useEffect(() => {
    if (countdown === undefined || countdown < 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => (prev !== undefined && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // Handle user answer and progress to the next question
  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestion >= questions.length - 1) {
      setQuizStarted(false);
      return;
    }

    const newCurrentImage = currentImage + 1;
    setCurrentQuestion(currentQuestion + 1);
    setCurrentImage(newCurrentImage);

    if ((newCurrentImage - 1) % IMAGE_TRIGGER === 0) {
      setLevel((prevLevel) => prevLevel + 1);
    }
  };

  // Calculate user score
  const calculateScore = () => {
    const correctAnswers = questions.map((q) => q.answer);
    const score = userAnswers.filter(
      (answer, index) => answer === correctAnswers[index],
    ).length;
    const successRate = (score / questions.length) * 100;
    return { score, successRate };
  };

  // Reset quiz
  const resetQuiz = () => {
    setDifficulty(undefined);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setShowImage(true);
    setQuizStarted(false);
    setCurrentImage(1);
    setLevel(0);
    setReduction(0); // Reset reduction as well
    setCountdown(undefined); // Reset countdown
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
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
