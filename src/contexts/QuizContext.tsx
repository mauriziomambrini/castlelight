import { questions as allQuestions } from '@/data/questions';
import type {
  DifficultyTypes,
  QuestionTypes,
  QuizContextTypes,
  QuizStateType,
} from '@/types/quizTypes';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

// Constants
const TOTAL_IMAGES = 6;
const IMAGE_TRIGGER = 2; // Must be a third of TOTAL_IMAGES
const TIME_REDUCTION = 3;
const DIFFICULTY_TIMES: Record<DifficultyTypes, number> = {
  easy: 20, // seconds
  medium: 15,
  hard: 10,
};

const DEFAULT_QUIZ_STATE: QuizStateType = {
  difficulty: undefined,
  initialTime: 0,
  currentImage: 1,
  currentQuestion: 0,
  level: 0,
  questions: [],
  quizStarted: false,
  reduction: 0,
  showImage: true,
  userAnswers: [],
  startTime: undefined,
  endTime: undefined,
  totalTime: 0,
};

// Create the Quiz context
export const QuizContext = createContext<QuizContextTypes | undefined>(
  undefined,
);

interface IQuizProvider {
  children: ReactNode;
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
  const [quizState, setQuizState] = useState<QuizStateType>(DEFAULT_QUIZ_STATE);
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const {
    currentImage,
    currentQuestion,
    difficulty,
    level,
    questions,
    reduction,
    showImage,
    userAnswers,
  } = quizState;

  const initialTime = DIFFICULTY_TIMES[difficulty!] - reduction;
  const question = questions[quizState.currentQuestion];

  const fillQuizState = <T extends keyof QuizStateType>(
    key: T,
    value: QuizStateType[T],
  ) => {
    setQuizState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Start quiz
  const startQuiz = () => {
    const startTime = new Date().getTime();
    setQuizState((prev) => ({
      ...prev,
      initialTime: initialTime,
      showImage: true,
      quizStarted: true,
      startTime: startTime,
    }));
    setCountdown(initialTime);
  };

  // Side effect to handle showing or hiding the image and managing countdown
  useEffect(() => {
    if (countdown !== 0 || !showImage) return;
    fillQuizState('showImage', false);
  }, [countdown, showImage]);

  // Set random questions on component mount
  useEffect(() => {
    const selectedQuestions = getRandomQuestions(allQuestions, TOTAL_IMAGES);
    fillQuizState('questions', selectedQuestions);
  }, []);

  // Set reduction based on the level
  useEffect(() => {
    if (level === 0) return;
    const newReduction = level * TIME_REDUCTION;
    fillQuizState('reduction', newReduction);
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
    fillQuizState('userAnswers', [...userAnswers, answer]);

    if (currentQuestion >= questions.length - 1) {
      const endTime = new Date().getTime();
      const totalTime = (endTime - quizState.startTime!) / 1000;
      fillQuizState('quizStarted', false);
      fillQuizState('endTime', endTime);
      fillQuizState('totalTime', totalTime);
      return;
    }

    const newCurrentImage = currentImage + 1;
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: currentQuestion + 1,
      currentImage: newCurrentImage,
    }));

    if ((newCurrentImage - 1) % IMAGE_TRIGGER === 0) {
      fillQuizState('level', level + 1);
      // setLevel((prevLevel) => prevLevel + 1);
    }
  };

  // Calculate user score
  const calculateScore = () => {
    const correctAnswers = questions.map((q) => q.answer);
    const score = quizState.userAnswers.filter(
      (answer, index) => answer === correctAnswers[index],
    ).length;
    const successRate = Math.floor((score / questions.length) * 100); // Apply Math.floor to round down
    return { score, successRate };
  };

  // Skip image and go to question
  const skipImage = () => {
    setCountdown(0);
  };

  // Reset quiz
  const resetQuiz = () => {
    const selectedQuestions = getRandomQuestions(allQuestions, TOTAL_IMAGES);
    setQuizState({
      ...DEFAULT_QUIZ_STATE,
      questions: selectedQuestions,
    });
    setCountdown(undefined); // Reset countdown
  };

  return (
    <QuizContext.Provider
      value={{
        calculateScore,
        initialTime,
        countdown,
        fillQuizState,
        handleAnswer,
        level,
        question,
        quizState,
        resetQuiz,
        setQuizState,
        startQuiz,
        skipImage,
        totalImages: TOTAL_IMAGES,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
