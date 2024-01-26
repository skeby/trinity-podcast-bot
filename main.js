import express from "express";
import bot from "./src/bot.js";
import cmd_start from "./src/commands/cmd_start.js";
import { connectToDB } from "./src/database/db.js";
import event_new_chat_members from "./src/events/event_new_chat_members.js";
// import event_left_chat_member from "./src/events/event_left_chat_member.js";
// import cmd_soldier_details from "./src/commands/cmd_soldier_details.js";

connectToDB("trinity-podcast-bot");

const server = express();
server.get("/", (req, res) => {
  res.send("Home endpoint of Trinity Telegram Bot!");
});

// Create a ping endpoint
server.get("/ping", (req, res) => {
  res.send("pong");
});

bot.start(cmd_start);
bot.on("new_chat_members", event_new_chat_members);
// bot.on("left_chat_member", event_left_chat_member);
// bot.command("soldier-details", cmd_soldier_details);

if (process.env.NODE_ENV === "production") {
  bot
    .launch({
      webhook: {
        domain: process.env.WEBHOOK_DOMAIN,
        port: process.env.WEBHOOK_PORT,
      },
    })
    .then(() => {
      console.log("Webhook bot listening on port " + process.env.WEBHOOK_PORT);
    })
    .catch((err) => {
      console.error("An error occured while starting the bot: ", err);
    });
} else {
  bot
    .launch({ dropPendingUpdates: true })
    .then(() => {
      console.log("Bot started");
    })
    .catch((err) => {
      console.error("An error occured while starting the bot: ", err);
    });
}

// Start the Express server
server.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
