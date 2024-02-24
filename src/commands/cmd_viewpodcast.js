import { getPodcastMarkup } from "../markups.js";
const cmd_viewpodcast = (ctx) => {
  ctx.reply(
    "Click the button below to view the Trinity Podcast.",
    getPodcastMarkup(ctx.chat.type)
  );
};

export default cmd_viewpodcast;
