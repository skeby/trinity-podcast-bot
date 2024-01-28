import { getUser } from "../database/db.js";

export default (ctx) => {
  let user;
  const id = ctx.chat.type === "private" ? ctx.chat.id : ctx.from.id;
  const username =
    ctx.chat.type === "private" ? ctx.chat.username : ctx.from.username;
  const firstName =
    ctx.chat.type === "private" ? ctx.chat.first_name : ctx.from.first_name;
  console.log("id: ", id);
  getUser(id).then((existingUser) => {
    if (existingUser) {
      user = existingUser;
      // Reply with details
      ctx.reply(
        `${firstName ? `${firstName}` : `@${username}`}, You are  No. ${
          user.communityNumber % 10
        } in Squad ${user.squad}, Platoon ${user.platoon}, Company ${
          user.company
        }, Battalion ${user.battalion}.\n\nYour soldier ID is S${user.squad}P${
          user.platoon
        }C${user.company}B${user.battalion}`
      );
    } else {
      ctx.reply(
        "You are not a soldier in Trinity Podcast\nJoin the Trinity Podcast Group:\n\nhttps://t.me/trinitypodcast"
      );
    }
  });
};
