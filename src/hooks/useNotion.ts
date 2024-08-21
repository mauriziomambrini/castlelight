import type { ScoreTypes } from '@/types/quizTypes.ts';
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
        const data = await response.json();
        setScores(data);
      } else {
        throw new Error('Failed to fetch scores');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (scoreData: Score) => {
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
    } catch (err) {
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
