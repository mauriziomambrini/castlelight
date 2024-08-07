import type { Dispatch, SetStateAction } from 'react';

export type QuestionTypes = {
  key: string;
  image: string;
  answer: string;
  options: string[];
};

export type DifficultyTypes = 'easy' | 'medium' | 'hard';

export type QuizStateType = {
  difficulty: DifficultyTypes | undefined;
  currentQuestion: number;
  userAnswers: string[];
  showImage: boolean;
  quizStarted: boolean;
  currentImage: number;
  level: number;
  reduction: number;
  questions: QuestionTypes[];
};

export type QuizContextTypes = {
  calculateScore: () => { score: number; successRate: number };
  countdown: number | undefined;
  fillQuizState: <T extends keyof QuizStateType>(
    key: T,
    value: QuizStateType[T],
  ) => void;
  handleAnswer: (answer: string) => void;
  level: number;
  question: QuestionTypes | undefined;
  quizState: QuizStateType;
  resetQuiz: () => void;
  setQuizState: Dispatch<SetStateAction<QuizStateType>>;
  skipImage: () => void;
  startQuiz: () => void;
  totalImages: number;
};
