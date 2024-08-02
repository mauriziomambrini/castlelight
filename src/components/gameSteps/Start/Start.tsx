import Typo from '@/components/typography/Typo';
import { useQuizContext } from '@/hooks/useQuizContext'; // Importa il nuovo hook che accede al contesto
import type { DifficultyTypes } from '@/types/quizTypes';
import { Fragment } from 'react';

const Start = () => {
  const { setDifficulty } = useQuizContext(); // Usa il contesto per accedere a setDifficulty

  const handleClick = (level: DifficultyTypes) => {
    setDifficulty(level); // Imposta la difficoltà utilizzando la funzione del contesto
  };

  return (
    <Fragment>
      <Typo text={'Set difficoltà'} />
      <button onClick={() => handleClick('easy')}>Easy</button>
      <button onClick={() => handleClick('medium')}>Medium</button>
      <button onClick={() => handleClick('hard')}>Hard</button>
    </Fragment>
  );
};

export default Start;
