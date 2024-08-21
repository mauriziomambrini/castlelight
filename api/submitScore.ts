import type { IncomingMessage, ServerResponse } from 'node:http';
import fetch from 'node-fetch';
import type { ScoreTypes } from '../src/types/quizTypes';

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, difficulty, score, success_rate, date, time }: ScoreTypes =
        JSON.parse(body);

      const notionToken = process.env.NOTION_API_KEY as string;
      const databaseId = process.env.NOTION_DATABASE_ID as string;

      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: databaseId },
          properties: {
            Name: {
              title: [{ text: { content: name } }],
            },
            Difficulty: {
              select: { name: difficulty },
            },
            Score: {
              number: score,
            },
            SuccessRate: {
              number: success_rate,
            },
            Date: {
              date: { start: date },
            },
            Time: {
              rich_text: [{ text: { content: time } }],
            },
          },
        }),
      });

      if (response.ok) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Success' }));
      } else {
        res.statusCode = response.status;
        res.end(JSON.stringify({ message: 'Failed to submit data' }));
      }
    });
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
}
