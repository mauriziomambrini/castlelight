export type QuestionTypes = {
  key: string;
  image: string;
  answer: string;
  options: string[];
};

export type DifficultyTypes = 'easy' | 'medium' | 'hard';

export type QuizContextTypes = {
  difficulty: DifficultyTypes | undefined;
  countdown: number | undefined;
  currentQuestion: number;
  question: QuestionTypes | undefined;
  showImage: boolean;
  quizStarted: boolean;
  userAnswers: string[];
  startQuiz: () => void;
  handleAnswer: (answer: string) => void;
  setDifficulty: (level: DifficultyTypes) => void;
  calculateScore: () => { score: number; successRate: number };
  currentImage: number;
  totalImages: number;
  level: number;
};
