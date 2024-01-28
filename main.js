import bot from "./src/bot.js";
import cmd_start from "./src/commands/cmd_start.js";
import cmd_ourvision from "./src/commands/cmd_ourvision.js";
import cmd_soldierdetails from "./src/commands/cmd_soldierdetails.js";
import { connectToDB } from "./src/database/db.js";
import event_new_chat_members from "./src/events/event_new_chat_members.js";
// import event_left_chat_member from "./src/events/event_left_chat_member.js";

connectToDB("trinity-podcast-bot");

bot.start(cmd_start);
bot.command("ourvision", cmd_ourvision);
bot.command("soldierdetails", cmd_soldierdetails);
bot.on("new_chat_members", event_new_chat_members);
// bot.on("left_chat_member", event_left_chat_member);

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
