import HiddenImage from '@/components/game/HiddenImage';
import QuestionsList from '@/components/game/QuestionsList';
import { useQuizContext } from '@/hooks/useQuizContext'; // Importa il nuovo hook che accede al contesto
import { useEffect } from 'react';

const Quiz = () => {
  const { question, quizState, startQuiz } = useQuizContext();
  const { difficulty, currentQuestion, showImage, quizStarted } = quizState;

  useEffect(() => {
    startQuiz();
  }, [currentQuestion]);

  if (showImage && question?.image) {
    return <HiddenImage image={question?.image} difficulty={difficulty} />;
  }

  if (quizStarted && question) {
    return <QuestionsList />;
  }

  return null;
};

export default Quiz;
