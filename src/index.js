const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Replace CHAT_GROUP_ID with the actual chat group id
const chatGroupId = -784606661;

let botRunning = false;
let offset = 0;

async function listenForMessages() {
  try {
    if (!botRunning) {
      botRunning = true;
      // Get the latest updates for the bot
      const updates = await bot.getUpdates({offset});

      // Iterate over the updates
      for (const update of updates) {
        if (update.message && update.message.chat.id === chatGroupId) {
          // The update is a message from the chat group
          const message = update.message.text;

          // Send the message to the chatbot's API
          // const response = await chatbotApi.sendMessage(message);

          // Send the chatbot's response back to the Telegram chat
          bot.sendMessage(chatGroupId, "yo its max");
        }
        offset = update.update_id + 1;
        console.log({offset});
      }

      botRunning = false;
    }
  } finally {
    console.log({botRunning});
  }
}

setInterval(listenForMessages, 1000); // Check for new messages every 1 second
