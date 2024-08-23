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
  const fetchScores = async () => {
    startLoading();

    try {
      const response = await fetch('/api/getScores');

      // Handle non-OK responses
      if (!response.ok) {
        fillNotionState('error', 'Failed to fetch scores');
        return;
      }

      const data: ScoreTypes[] = await response.json();
      fillNotionState('scores', data); // Process data if response is OK
    } catch (err: any) {
      fillNotionState('error', err.message); // Set error message if an exception occurs
    } finally {
      fillNotionState('loading', false); // Stop loading, whether successful or not
    }
  };

  // Submit new score
  const submitScore = async (scoreData: ScoreTypes) => {
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
        fillNotionState('error', 'Failed to submit score');
        return;
      }
    } catch (err: any) {
      fillNotionState('error', err.message); // Set error message if an exception occurs
    } finally {
      fillNotionState('loading', false); // Stop loading, whether successful or not
    }
  };

  // Get top 10 scores for difficulty
  const getTopScores = (difficulty: DifficultyTypes) => {
    // Filter scores by difficulty
    const filteredScores = notionState.scores.filter((score) => score.difficulty === difficulty);

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
