import { Markup } from "telegraf";
const getPodcastMarkup = (chatType) => {
  if (chatType === "private") {
    return Markup.inlineKeyboard([
      Markup.button.webApp(
        "View Podcast",
        "https://trinity.onpodium.co/episodes/9-staying-true-to-purpose-avoiding-competition-comparison-ayomide-soretire"
      ),
    ]);
  } else {
    return Markup.inlineKeyboard([
      Markup.button.url("View Podcast", "https://t.me/trinitydevbot/podcast"),
    ]);
  }
};

export { getPodcastMarkup };
