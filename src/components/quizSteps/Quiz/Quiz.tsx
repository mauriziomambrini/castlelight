import HiddenImage from '@/components/quizSteps/HiddenImage';
import QuestionsList from '@/components/quizSteps/QuestionsList';
import { useQuizContext } from '@/hooks/useQuizContext'; // Importa il nuovo hook che accede al contesto
import { useEffect } from 'react';

const Quiz = () => {
  const {
    difficulty,
    currentQuestion,
    question,
    showImage,
    quizStarted,
    startQuiz,
  } = useQuizContext();

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
