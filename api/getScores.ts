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

    if (!notionToken || !databaseId) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ message: 'Notion token or database ID is missing' }),
      );
      return;
    }

    try {
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
      console.log('Response from Notion:', responseBody); // Logga la risposta completa

      if (response.ok) {
        const data = JSON.parse(responseBody);

        // Log dettagliato per verificare la struttura del singolo oggetto
        if (data.results && data.results.length > 0) {
          console.log(
            'First item structure:',
            JSON.stringify(data.results[0], null, 2),
          );
        }

        const scores: ScoreTypes[] = data.results.map((page: any) => {
          const name =
            page.properties?.Name?.title?.[0]?.text?.content || 'Unknown';
          const difficulty =
            page.properties?.Difficulty?.select?.name || 'Unknown';
          const score = page.properties?.Score?.number || 0;
          const success_rate = page.properties?.SuccessRate?.number || 0;
          const date = page.properties?.Date?.date?.start || 'Unknown';
          const time =
            page.properties?.Time?.rich_text?.[0]?.text?.content || 'Unknown';

          return {
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
        res.end(
          JSON.stringify({
            message: 'Failed to fetch data',
            details: responseBody,
          }),
        );
      }
    } catch (error: any) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ message: 'Server error', details: error.message }),
      );
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
}
