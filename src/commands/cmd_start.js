import { getPodcastMarkup } from "../markups.js";
const cmd_start = (ctx) => {
  const username = ctx.from.username;
  const firstName = ctx.from.first_name;
  ctx.reply(
    `Hello ${
      firstName ? `${firstName}` : `@${username}`
    }.\nWelcome to the Trinity Army Camp, a community designed to help you become the original you.\n#BecomeTheOriginalYou\n\nSend /soldierdetails to get your Trinity Army ID. \nSend /viewpodcast to view the Trinity Podcast.`
  );
};

export default cmd_start;
