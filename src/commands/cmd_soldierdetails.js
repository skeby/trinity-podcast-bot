import { getUser } from "../database/db.js";

export default (ctx) => {
  let user;
  const id = ctx.chat.type === "private" ? ctx.chat.id : ctx.from.id;
  const username =
    ctx.chat.type === "private" ? ctx.chat.username : ctx.from.username;
  const firstName =
    ctx.chat.type === "private" ? ctx.chat.first_name : ctx.from.first_name;

  getUser(id).then((existingUser) => {
    if (existingUser) {
      user = existingUser;
      // Reply with details
      ctx.reply(
        `${username ? `@${username}` : firstName}, You are in squad ${
          user.squad
        }, platoon ${user.platoon}, company ${user.company}, battalion ${
          user.battalion
        }`
      );
    } else {
      ctx.reply(
        "You are not a soldier in Trinity Podcast\nJoin the Trinity Podcast Group:\n\nhttps://t.me/trinitypodcast"
      );
    }
  });
};
