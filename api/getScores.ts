import type { IncomingMessage, ServerResponse } from 'node:http';
import fetch from 'node-fetch';
import type { ScoreTypes } from '../src/types/quizTypes';

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method === 'GET') {
    const notionToken = process.env.NOTION_API_KEY as string;
    const databaseId = process.env.NOTION_DATABASE_ID as string;

    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      const scores: ScoreTypes[] = data.results.map((page: any) => ({
        name: page.properties.Name.title[0]?.text.content || '',
        difficulty: page.properties.Difficulty.select.name || '',
        score: page.properties.Score.number || 0,
        success_rate: page.properties.SuccessRate.number || 0,
        date: page.properties.Date.date.start || '',
        time: page.properties.Time.rich_text[0]?.text.content || '',
      }));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(scores));
    } else {
      res.statusCode = response.status;
      res.end(JSON.stringify({ message: 'Failed to fetch data' }));
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
}
