import HiddenImage from '@/components/HiddenImage';
import { useQuizContext } from '@/hooks/useQuizContext'; // Importa il nuovo hook che accede al contesto
import { useEffect } from 'react';

const Game = () => {
  const {
    currentQuestion,
    question,
    showImage,
    quizStarted,
    handleAnswer,
    userAnswers,
    startQuiz,
  } = useQuizContext(); // Usa il contesto per accedere agli stati e funzioni necessari

  useEffect(() => {
    startQuiz();
  }, [currentQuestion]);

  if (showImage && question?.image) {
    return <HiddenImage image={question?.image} />;
  }

  if (quizStarted && question) {
    return (
      <div>
        <h2>Select the correct answer:</h2>
        {question.options.map((option) => (
          <button key={option.value} onClick={() => handleAnswer(option.value)}>
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  return null;
};

export default Game;
