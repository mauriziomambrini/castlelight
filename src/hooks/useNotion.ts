import type { DifficultyTypes, NotionStateTypes, ScoreTypes } from '@/types/quizTypes';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_NOTION_STATE: NotionStateTypes = {
  scores: [],
  error: null,
  loading: false,
};

export const useNotion = () => {
  const [notionState, setNotionState] = useState<NotionStateTypes>(DEFAULT_NOTION_STATE);

  const fillNotionState = <T extends keyof NotionStateTypes>(key: T, value: NotionStateTypes[T]) => {
    setNotionState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const startLoading = () => {
    setNotionState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
  };

  // Fetch scores
  const fetchScores = async (): Promise<ScoreTypes[]> => {
    const ERROR_MSG = 'Failed to fetch scores';

    try {
      startLoading();
      const response = await fetch('/api/getScores');

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(ERROR_MSG);
      }

      const data: ScoreTypes[] = await response.json();
      fillNotionState('scores', data);
      return data;
    } catch (err: any) {
      fillNotionState('error', err?.message || ERROR_MSG); // Set error message if an exception occurs
      return [];
    } finally {
      fillNotionState('loading', false); // Stop loading, whether successful or not
    }
  };

  // Submit new score
  const submitScore = async (scoreData: ScoreTypes): Promise<void> => {
    const ERROR_MSG = 'Failed to submit score';
    startLoading();

    try {
      const id = uuidv4(); // Generate a unique ID

      const response = await fetch('/api/submitScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...scoreData, id }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(ERROR_MSG);
      }
    } catch (err: any) {
      fillNotionState('error', err?.message || ERROR_MSG); // Set error message if an exception occurs
    } finally {
      fillNotionState('loading', false); // Stop loading, whether successful or not
    }
  };

  // Get top 10 scores for difficulty
  const getTopScores = async (difficulty: DifficultyTypes): Promise<ScoreTypes[]> => {
    const scores_list = notionState.scores;

    // Filter scores by difficulty
    const filteredScores = scores_list.filter((score) => score.difficulty === difficulty);

    // Sort scores based on success_rate, time, date
    const sortedScores = filteredScores.sort((a, b) => {
      const successRateComparison = b.success_rate - a.success_rate; // Compare success_rate
      const timeComparison = a.time - b.time; // Compare time

      if (successRateComparison !== 0) return successRateComparison;
      if (timeComparison !== 0) return timeComparison;
      return a.date.localeCompare(b.date); // Compare ISO date
    });

    return sortedScores.slice(0, 10);
  };

  // Destructure state
  const { scores, error, loading } = notionState;

  return {
    scores,
    error,
    loading,
    fetchScores,
    submitScore,
    getTopScores,
  };
};
