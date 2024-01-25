import { Schema, model } from "mongoose";

const userSchema = new Schema({
  communityNumber: { type: Number, required: true },
  userId: { type: String, required: true },
  squad: { type: Number, required: true },
  platoon: { type: Number, required: true },
  company: { type: Number, required: true },
  battalion: { type: Number, required: true },
});

const User = model("User", userSchema);

export default User;
