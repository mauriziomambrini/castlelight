import type { ScoreTypes } from '@/types/quizTypes';
import { useState } from 'react';

export const useNotion = () => {
  const [scores, setScores] = useState<ScoreTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getScores');
      if (response.ok) {
        const data: ScoreTypes[] = await response.json(); // Tipizza la risposta JSON
        setScores(data);
      } else {
        throw new Error('Failed to fetch scores');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (scoreData: ScoreTypes) => {
    // Cambia Score a ScoreTypes
    setLoading(true);
    try {
      const response = await fetch('/api/submitScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    scores,
    error,
    loading,
    fetchScores,
    submitScore,
  };
};
