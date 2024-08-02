import { QuizContext } from '@/contexts/QuizContext'; // Assicurati di usare il percorso corretto
import { useContext } from 'react';

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
