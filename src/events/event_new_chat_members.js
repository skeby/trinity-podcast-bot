import { getUser, getUserCount, postUser } from "../database/db.js";
import errorHandler from "../errorHandler.js";

const newUserReply = (
  ctx,
  firstName,
  username,
  { communityNumber, squad, platoon, company, battalion }
) => {
  const numberInSquad = communityNumber % 10 === 0 ? 10 : communityNumber % 10;
  ctx.reply(
    `Welcome to the Trinity Army Camp 🎪, ${
      firstName ? `${firstName}` : `@${username}.`
    }\n\nYou are No. ${numberInSquad} in Squad ${squad}, Platoon ${platoon}, Company ${company}, Battalion ${battalion}. Your soldier ID is S${squad}P${platoon}C${company}B${battalion}-${communityNumber}.\n\nTo know more about Trinity feel free to explore the commands.`
  );
};

export default (ctx) => {
  try {
    const newChatMembers = ctx.message.new_chat_members;
    getUserCount().then((userCount) => {
      newChatMembers.forEach((newChatMember) => {
        // Exit function if user is a bot
        if (newChatMember.is_bot) return;
        const user = newChatMember;
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
            newUserReply(ctx, user.first_name, user.username, userObj);
          } else {
            newUserReply(ctx, user.first_name, user.username, existingUser);
          }
        });
      });
    });
  } catch (err) {
    errorHandler(err, "Event new_chat_members");
  }
};
