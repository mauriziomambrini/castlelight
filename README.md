# Castle light

Castle light is s an **image-based puzzle game** where players must illuminate fragments of hidden images to uncover the mystery.

Developed with **React** and **TypeScript** for a robust and strongly-typed codebase, it uses **Vite JS** for an optimized development experience. Castle light leverages **Notion** as a serverless database, integrating seamlessly with the API to manage game data efficiently.

View in action: [castlelight.net](https://www.castlelight.net)

## Installation

After cloning the repository, move into the project directory:

```
cd castlelight
```

## Install dependencies

```
# npm
npm install

# yarn
yarn install

# bun
bun install
```

Once all the dependencies are installed, you can start the local development server.

```
# npm
npm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Configuring Notion for API Use

To use Notion as a database with Castle light, follow these steps to configure Notion and set up the required environment variables:

### Create a Notion Account
If you don't already have one, sign up for a free [Notion](https://www.notion.so/) account.

### Set Up a Notion Database
Create a new Notion page and add a database to it. You can use a table or any other database format that suits your needs for storing game-related data.

### Integrate with the Notion API
- Go to [Notion Integrations](https://www.notion.so/integrations) and create a new integration.
- Note the Integration Token, as you'll need it for authentication.
- Share the database with your integration by clicking Share in the Notion database and selecting your integration from the list.

### Environment Variables
Set up the following environment variables in your `.env.local` file.

```
NOTION_API_KEY=your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

Replace your_integration_token_here with the Integration Token obtained from the Notion Integrations page and your_database_id_here with the ID of your Notion database (this can be found in the URL of your database or by using the Notion API to list your databases).

Use the Notion API: The project will now be able to interact with the Notion database using the Notion API. This will allow you to read and write data from the Notion database, enabling dynamic and scalable data management for the game.




## Enjoy playing Castle light!
