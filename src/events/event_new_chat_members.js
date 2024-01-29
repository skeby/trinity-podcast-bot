import { getUser, getUserCount, postUser } from "../database/db.js";

const newUserReply = (
  ctx,
  { communityNumber, squad, platoon, company, battalion }
) => {
  const username = ctx.from.username;
  const firstName = ctx.from.first_name;
  ctx.reply(
    `Welcome to the Trinity Army Camp 🎪, ${
      firstName ? `${firstName}` : `@${username}.`
    }\n\nYou are No. ${
      communityNumber % 10
    } in Squad ${squad}, Platoon ${platoon}, Company ${company}, Battalion ${battalion}. Your soldier ID is S${squad}P${platoon}C${company}B${battalion}.\n\nTo know more about Trinity feel free to explore the commands.`
  );
};

export default (ctx) => {
  try {
    let userCount;
    getUserCount().then((count) => {
      userCount = count;
      const user = ctx.message.new_chat_members[0];

      // Exit function if user is a bot
      if (user.is_bot) return;

      userCount++;
      const userObj = {
        communityNumber: userCount,
        userId: user.id,
        squad: Math.ceil(userCount / 10),
        platoon: Math.ceil(userCount / 50),
        company: Math.ceil(userCount / 1000),
        battalion: Math.ceil(userCount / 100000),
      };
      getUser(user.id).then((existingUser) => {
        if (!existingUser) {
          postUser(userObj);
          newUserReply(ctx, userObj);
        } else {
          newUserReply(ctx, existingUser);
        }
      });
    });
  } catch (err) {
    console.error("An error occured when adding new user to community", err);
  }
};
