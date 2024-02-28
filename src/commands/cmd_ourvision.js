import errorHandler from "../errorHandler.js";

const cmd_ourvision = (ctx) => {
  try {
    ctx.reply(
      "We are an organization with a vision of helping 2 Billion people uncover their purpose, maximize their potential and invariably become wealthy. #2BillionSouls"
    );
  } catch (err) {
    errorHandler(err, "Command /ourvision");
  }
};

export default cmd_ourvision;
