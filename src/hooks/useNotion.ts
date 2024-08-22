import type {
  DifficultyTypes,
  NotionStateTypes,
  ScoreTypes,
} from '@/types/quizTypes';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library to generate unique IDs

// Default initial state
const DEFAULT_NOTION_STATE: NotionStateTypes = {
  scores: [],
  error: null,
  loading: false,
};

export const useNotion = () => {
  // Unified state using a single useState hook
  const [notionState, setNotionState] =
    useState<NotionStateTypes>(DEFAULT_NOTION_STATE);

  // Function to update a specific key in the notionState
  const fillNotionState = <T extends keyof NotionStateTypes>(
    key: T,
    value: NotionStateTypes[T],
  ) => {
    setNotionState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Function to set multiple keys for handling complex operations
  const startLoading = () => {
    setNotionState((prev) => ({
      ...prev,
      loading: true,
      error: null, // Optionally reset error when starting a new operation
    }));
  };

  // Function to fetch scores from the server
  const fetchScores = async () => {
    startLoading();
    try {
      const response = await fetch('/api/getScores');
      if (response.ok) {
        const data: ScoreTypes[] = await response.json(); // Type the JSON response
        fillNotionState('scores', data); // Update scores in the state
      } else {
        throw new Error('Failed to fetch scores'); // Handle non-OK responses
      }
    } catch (err: any) {
      fillNotionState('error', err.message); // Set error message if fetching fails
    } finally {
      fillNotionState('loading', false); // Stop the loading indicator
    }
  };

  // Function to submit a new score to the server
  const submitScore = async (scoreData: ScoreTypes) => {
    startLoading();
    try {
      const id = uuidv4(); // Generate a unique ID for the score entry

      const response = await fetch('/api/submitScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...scoreData, id }), // Include the generated ID in the request body
      });
      if (!response.ok) {
        throw new Error('Failed to submit score'); // Handle non-OK responses
      }
    } catch (err: any) {
      fillNotionState('error', err.message); // Set error message if submission fails
    } finally {
      fillNotionState('loading', false); // Stop the loading indicator
    }
  };

  // Function to get the top 10 scores for a specific difficulty level
  const getTopScores = (difficulty: DifficultyTypes) => {
    // Filter scores by the given difficulty
    const filteredScores = notionState.scores.filter(
      (score) => score.difficulty === difficulty,
    );

    // Sort the scores based on success_rate, then time (in seconds), then full ISO date string (including time)
    const sortedScores = filteredScores.sort((a, b) => {
      const successRateComparison = b.success_rate - a.success_rate;
      if (successRateComparison !== 0) return successRateComparison;

      const timeComparison = a.time - b.time; // Compare numeric time directly
      if (timeComparison !== 0) return timeComparison;

      return a.date.localeCompare(b.date); // Compare ISO date strings directly
    });

    // Return the top 10 scores
    return sortedScores.slice(0, 10);
  };

  // Destructure state properties for easier access in components
  const { scores, error, loading } = notionState;

  // Return the states and functions for use in components
  return {
    scores,
    error,
    loading,
    fetchScores,
    submitScore,
    getTopScores,
  };
};
