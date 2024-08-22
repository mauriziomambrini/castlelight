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
  initialTime: number;
  currentQuestion: number;
  userAnswers: string[];
  showImage: boolean;
  quizStarted: boolean;
  currentImage: number;
  level: number;
  reduction: number;
  questions: QuestionTypes[];
  startTime: number | undefined;
  endTime: number | undefined;
  totalDuration: number | undefined;
};

export type QuizContextTypes = {
  calculateScore: () => { score: number; successRate: number };
  initialTime: number;
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

export type ScoreTypes = {
  id?: string;
  name: string;
  difficulty: string;
  score: number;
  success_rate: number;
  date: string;
  time: string;
};

export type NotionStateTypes = {
  scores: ScoreTypes[];
  error: string | null;
  loading: boolean;
};
