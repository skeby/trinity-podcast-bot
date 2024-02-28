import { getUser } from "../database/db.js";

export default (ctx) => {
  const id = ctx.from.id;
  const username = ctx.from.username;
  const firstName = ctx.from.first_name;
  getUser(id).then((user) => {
    if (user) {
      const numberInSquad =
        user.communityNumber % 10 === 0 ? 10 : user.communityNumber % 10;
      // Reply with details
      ctx.reply(
        `${
          firstName ? `${firstName}` : `@${username}`
        }, You are  No. ${numberInSquad} in Squad ${user.squad}, Platoon ${
          user.platoon
        }, Company ${user.company}, Battalion ${
          user.battalion
        }.\n\nYour soldier ID is S${user.squad}P${user.platoon}C${
          user.company
        }B${user.battalion}-${user.communityNumber}.`
      );
    } else {
      ctx.reply(
        "You are not a soldier in Trinity Army.\nJoin the Trinity Army Camp:\n\nhttps://t.me/+6H5X2Ynjs2dmMTg8"
      );
    }
  });
};
