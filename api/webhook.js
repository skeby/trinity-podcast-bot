import bot from "./bot.js";
// import cmd_soldier_details from "./src/commands/cmd_soldier_details.js";
import { connectToDB } from "./database/db.js";
import cmd_start from "./commands/cmd_start.js";
import event_new_chat_members from "./events/event_new_chat_members.js";
import event_left_chat_member from "./events/event_left_chat_member.js";

connectToDB("trinity-podcast-bot");

export default (_, res) => {
  bot.start(cmd_start);
  bot.on("new_chat_members", event_new_chat_members);
  // bot.on("left_chat_member", event_left_chat_member);
  // bot.command("soldier-details", cmd_soldier_details);

  // bot
  //   .launch()
  //   .then(() => {
  //     console.log("Bot started");
  //   })
  //   .catch((err) => {
  //     console.error("An error occured while starting the bot: ", err);
  //   });
  res.send("Bot is running");
};
