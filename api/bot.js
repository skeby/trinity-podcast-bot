import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

export { bot };

export default (_, res) => {
  res.send("OK");
};
