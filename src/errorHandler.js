import bot from "./bot.js";

const errorHandler = (err, context) => {
  console.error(`An error occured\nContext: ${context}\n\nError:\n${err}`);
  bot.telegram.sendMessage(
    2080434793,
    `An error occured in Elijah (Trinity Army Camp Production Bot)\n\nContext: ${context}\n\nError:\n${err}`
  );
};

export default errorHandler;
