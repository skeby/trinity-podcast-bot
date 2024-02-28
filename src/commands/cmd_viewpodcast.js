import errorHandler from "../errorHandler.js";
import { getPodcastMarkup } from "../markups.js";

const cmd_viewpodcast = (ctx) => {
  try {
    ctx.reply(
      "Click the button below to listen to the Trinity Podcast.",
      getPodcastMarkup(ctx.chat.type)
    );
  } catch (err) {
    errorHandler(err, "Command /viewpodcast");
  }
};

export default cmd_viewpodcast;
