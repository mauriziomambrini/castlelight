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
      try {
        const {
          id,
          name,
          difficulty,
          score,
          success_rate,
          date,
          time,
        }: ScoreTypes = JSON.parse(body);

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
              id: {
                title: [{ text: { content: id } }],
              },
              name: {
                rich_text: [{ text: { content: name } }],
              },
              difficulty: {
                rich_text: [{ text: { content: difficulty } }],
              },
              score: {
                number: score,
              },
              success_rate: {
                number: success_rate,
              },
              date: {
                date: { start: date },
              },
              time: {
                rich_text: [{ text: { content: time } }],
              },
            },
          }),
        });

        const responseBody = await response.text();

        if (response.ok) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Success' }));
        } else {
          console.error('Failed to submit data:', responseBody);
          res.statusCode = response.status;
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
        res.end(
          JSON.stringify({ message: 'Server error', details: error.message }),
        );
      }
    });
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
}
