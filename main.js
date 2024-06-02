import express from "express";
import { message } from "telegraf/filters";
import bot from "./src/bot.js";
import cmd_start from "./src/commands/cmd_start.js";
import cmd_ourvision from "./src/commands/cmd_ourvision.js";
import cmd_soldierdetails from "./src/commands/cmd_soldierdetails.js";
import cmd_viewpodcast from "./src/commands/cmd_viewpodcast.js";
import cmd_usercount from "./src/commands/cmd_usercount";
import { connectToDB } from "./src/database/db.js";
import event_new_chat_members from "./src/events/event_new_chat_members.js";

const server = express();

connectToDB("trinity-podcast-bot");

bot.start(cmd_start);
bot.command("ourvision", cmd_ourvision);
bot.command("soldierdetails", cmd_soldierdetails);
bot.command("viewpodcast", cmd_viewpodcast);
bot.command("usercount", cmd_usercount);
bot.on(message("new_chat_members"), event_new_chat_members);

if (process.env.NODE_ENV === "production") {
  // bot
  //   .launch({
  //     webhook: {
  //       domain: process.env.WEBHOOK_DOMAIN,
  //       port: process.env.WEBHOOK_PORT,
  //     },
  //   })
  //   .then(() => {
  //     console.log("Webhook bot listening on port " + process.env.WEBHOOK_PORT);
  //   })
  //   .catch((err) => {
  //     console.error("An error occured while starting the bot: ", err);
  //   });
  bot
    .createWebhook({ domain: process.env.WEBHOOK_DOMAIN })
    .then((middleware) => {
      server.use(middleware);
      server.get("/", (_, res) => {
        res.send("Hello World!");
      });
      server.listen(process.env.WEBHOOK_PORT, () => {
        console.log(`Server is listening on port ${process.env.WEBHOOK_PORT}`);
      });
    })
    .catch((err) =>
      console.error("An error occured while setting up the webhook:", err)
    );
} else {
  bot.launch({ dropPendingUpdates: true }).catch((err) => {
    console.error("An error occured while starting the bot: ", err);
  });
  bot.telegram
    .getMe()
    .then((res) =>
      console.log(
        `Bot started in ${process.env.NODE_ENV} mode on https://t.me/${res.username}`
      )
    );
}
