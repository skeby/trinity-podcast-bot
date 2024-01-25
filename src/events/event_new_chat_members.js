import { getUserCount, postUser } from "../database/db.js";

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

      postUser(userObj);
      const { squad, platoon, company, battalion } = userObj;
      ctx.reply(
        `Welcome to the Trinity Army Camp🎪\n\nYou are now part of Battalion ${battalion}, Company ${company}, Platoon ${platoon}, Squad ${squad}.\n\nTo know more about Trinity feel free to explore the command.`
      );
      console.log("User: ", user);
    });
  } catch (err) {
    console.error("An error occured when adding new user to community", err);
  }
};
