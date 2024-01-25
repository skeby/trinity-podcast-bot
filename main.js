import { session } from "telegraf";
import bot from "./src/bot.js";
import cmd_start from "./src/commands/cmd_start.js";
import cmd_soldier_details from "./src/commands/cmd_soldier_details.js";

bot.use(session());

let communityNumber = 0;
const community = {};

bot.start(cmd_start);
bot.command("soldier-details", cmd_soldier_details);

bot.on("new_chat_members", (ctx) => {
  try {
    communityNumber++;
    const user = ctx.message.new_chat_members[0];

    // Exit function if user is a bot
    if (user.is_bot) return;

    community[user.id] = {
      communityNumber,
      squad: Math.ceil(communityNumber / 10) + 1,
      platoon: Math.ceil(communityNumber / 50) + 1,
      company: Math.ceil(communityNumber / 1000) + 1,
      battalion: Math.ceil(communityNumber / 100000) + 1,
    };
    const { squad, platoon, company, battalion } = community[user.id];
    ctx.reply(
      `${user.first_name}, You are in squad ${squad}, platoon ${platoon}, company ${company}, battalion ${battalion}`
    );
    console.log(user);
  } catch (err) {
    console.error("An error occured when adding new user to community", err);
  }
});

bot.on("text", (ctx) => {
  const user = ctx.message.from;
  if (community[user.id]) {
    const { squad, platoon, company, battalion } = community[user.id];
    ctx.reply(
      `You are in squad ${squad}, platoon ${platoon}, company ${company}, battalion ${battalion}`
    );
  } else {
    ctx.reply("You are not part of the community yet.");
  }
});

bot.launch().then(() => {
  console.log("Bot started");
});

const getUsername = (userId, ctx) => {
  bot.telegram
    .getChatMember(ctx.chat.id, userId)
    .then((res) => {
      return res.user.username;
    })
    .catch((err) => {
      console.error("An error occured when getting username", err);
    });
};
