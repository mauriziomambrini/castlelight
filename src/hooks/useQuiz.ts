import { useCountdown } from '@/hooks/useCountdown';
import type { QuestionType } from '@/types/quizTypes.ts';
import { useState } from 'react';

export const useQuiz = (
  questions: QuestionType[],
  difficulty: 'easy' | 'medium' | 'hard',
) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  const { countdown, startCountdown, resetCountdown } =
    useCountdown(difficulty);

  const question = questions[currentQuestion];

  const startQuiz = () => {
    setShowImage(true);
    setQuizStarted(false);
    startCountdown();
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      resetCountdown();
      startQuiz();
    } else {
      setQuizStarted(false);
    }
  };

  if (countdown === '00:00' && showImage) {
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

  return {
    currentQuestion,
    question,
    showImage,
    quizStarted,
    countdown,
    handleAnswer,
    userAnswers,
    calculateScore,
    startQuiz,
  };
};
