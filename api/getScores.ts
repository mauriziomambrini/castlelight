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

    const responseBody = await response.text();

    if (response.ok) {
      const data = JSON.parse(responseBody);

      const scores: ScoreTypes[] = data.results.map((page: any) => {
        const id =
          page.properties?.name?.title?.[0]?.text?.content || 'Unknown';
        const name =
          page.properties?.name?.rich_text?.[0]?.text?.content || 'Unknown';
        const difficulty =
          page.properties?.difficulty?.rich_text?.[0]?.text?.content ||
          'Unknown';
        const score = page.properties?.score?.number || 0;
        const success_rate = page.properties?.success_rate?.number || 0;
        const date = page.properties?.date?.date?.start || 'Unknown';
        const time =
          page.properties?.time?.rich_text?.[0]?.text?.content || 'Unknown';

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
