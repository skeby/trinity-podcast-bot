import { getUser } from "../database/db.js";

export default (ctx) => {
  let user;
  getUser(ctx.chat.id).then((existingUser) => {
    if (existingUser) {
      user = existingUser;
      // Reply with details
      ctx.reply(
        `${
          ctx.username ? `@${ctx.chat.username}` : ctx.chat.first_name
        }, You are in squad ${user.squad}, platoon ${user.platoon}, company ${
          user.company
        }, battalion ${user.battalion}`
      );
    } else {
      ctx.reply(
        "You are not a soldier in Trinity Podcast\nJoin the Trinity Podcast Group:\n\nhttps://t.me/trinitypodcast"
      );
    }
  });
};
