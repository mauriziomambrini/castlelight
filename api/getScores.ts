import type { IncomingMessage, ServerResponse } from 'node:http';
import type { ScoreTypes } from '../src/types/quizTypes';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const notionToken = process.env.NOTION_API_KEY as string;
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const apiUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const headers = {
    Authorization: `Bearer ${notionToken}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };

  // Check HTTP method
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
    return;
  }

  // Make request to Notion API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
  });

  const responseBody = await response.text();

  // Check if request successful
  if (!response.ok) {
    res.statusCode = response.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Failed to fetch data' }));
    return;
  }

  // Process data
  const data = JSON.parse(responseBody);

  const scores: ScoreTypes[] = data.results.map((page: any) => {
    const id = page.properties?.name?.title?.[0]?.text?.content || 'unknown';
    const name = page.properties?.name?.rich_text?.[0]?.text?.content || 'unknown';
    const difficulty = page.properties?.difficulty?.rich_text?.[0]?.text?.content || 'unknown';
    const score = page.properties?.score?.number || 0;
    const success_rate = page.properties?.success_rate?.number || 0;
    const date = page.properties?.date?.date?.start || 'unknown';
    const time = page.properties?.time?.number || 0;

    return {
      id,
      name,
      difficulty,
      score,
      success_rate,
      date,
      time,
    };
  });

  // Respond with processed data
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(scores));
}
