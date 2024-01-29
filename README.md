# Setting Up

Visit BotFather on Telegram, create a new bot and get your Bot Token.

Create a MongoDB account, create a cluster and get MongoDB connection string. This string will be used as the database base URI.

# Environment Variables

Create a `.env` file in the root directory:

```bash
BOT_TOKEN=<YOUR_BOT_TOKEN>
DB_BASE_URI=<YOUR_MONGODB_URI>
NODE_ENV=<production/development>
WEBHOOK_DOMAIN=<YOUR_WEBHOOK_DOMAIN>
WEBHOOK_PORT=443
EXPRESS_PORT=3000
```

# Installation

Run `npm i` to install all the required dependencies.

# Running the Bot

Run `npm run dev` to run the app in development mode.
