import { deleteUser } from "../database/db.js";

export default (ctx) => {
  const user = ctx.update.message.left_chat_member;
  deleteUser(user.id);
};
