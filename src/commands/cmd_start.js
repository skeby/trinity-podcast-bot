const cmd_start = (ctx) => {
  const username =
    ctx.chat.type === "private" ? ctx.chat.username : ctx.from.username;
  const firstName =
    ctx.chat.type === "private" ? ctx.chat.first_name : ctx.from.first_name;
  ctx.reply(
    `Hello ${
      firstName ? `${firstName}` : `@${username}`
    }\nWelcome to the Trinity Army Camp, a community designed to help you become the original you.\n#BecomeTheOriginalYou\n\nSend /soldierdetails to get your Trinity Army ID`
  );
};

export default cmd_start;
