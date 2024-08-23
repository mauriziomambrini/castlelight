import type { IncomingMessage, ServerResponse } from 'node:http';
import fetch from 'node-fetch';
import type { ScoreTypes } from '../src/types/quizTypes';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const notionToken = process.env.NOTION_API_KEY as string;
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const notionUrl = 'https://api.notion.com/v1/pages';
  const headers = {
    Authorization: `Bearer ${notionToken}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };

  // Check HTTP method
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
    return;
  }

  // Collect request body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      // Parse request body
      const { id, name, difficulty, score, success_rate, date, time }: ScoreTypes = JSON.parse(body);

      // Prepare request to Notion API
      const response = await fetch(notionUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties: {
            id: { title: [{ text: { content: id } }] },
            name: { rich_text: [{ text: { content: name } }] },
            difficulty: { rich_text: [{ text: { content: difficulty } }] },
            score: { number: score },
            success_rate: { number: success_rate },
            date: { date: { start: date } },
            time: { number: time },
          },
        }),
      });

      const responseBody = await response.text();

      // Check if request to Notion API was successful
      if (response.ok) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Success' }));
      } else {
        console.error('Failed to submit data:', responseBody);
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            message: 'Failed to submit data',
            details: responseBody,
          }),
        );
      }
    } catch (error: any) {
      console.error('Error handling POST request:', error.message);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Server error', details: error.message }));
    }
  });
}
