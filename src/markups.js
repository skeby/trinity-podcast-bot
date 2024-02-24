import { Markup } from "telegraf";
const getPodcastMarkup = (chatType) => {
  if (chatType === "private") {
    return Markup.inlineKeyboard([
      Markup.button.webApp(
        "View Podcast",
        "https://podcasters.spotify.com/pod/show/trinitypodcasting"
      ),
    ]);
  } else {
    return Markup.inlineKeyboard([
      Markup.button.url("View Podcast", "https://t.me/trinitydevbot/podcast"),
    ]);
  }
};

export { getPodcastMarkup };
