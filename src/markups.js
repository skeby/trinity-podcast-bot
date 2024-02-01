import { Markup } from "telegraf";
const podcastMarkup = Markup.inlineKeyboard([
  Markup.button.webApp(
    "View Podcast",
    "https://trinity.onpodium.co/episodes/9-staying-true-to-purpose-avoiding-competition-comparison-ayomide-soretire"
  ),
]);

export { podcastMarkup };
