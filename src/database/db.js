import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../database/models/User.js";

// Load content of .env file into process.env
dotenv.config();

const { connect, connection } = mongoose;
const DB_BASE_URI = process.env.DB_BASE_URI || "mongodb://127.0.0.1:27017";

const connectToDB = (databaseName) => {
  // Connect to the specified database
  connect(DB_BASE_URI + "/" + databaseName);
  connection.on("connected", () => {
    console.log("Database connected succesfully");
  });
};

const getUser = (userId) => {
  return User.findOne({ userId: userId });
};

const postUser = async (user) => {
  const newUser = new User(user);
  const existingUser = await User.findOne({ userId: user.userId });
  if (!existingUser) {
    await newUser
      .save()
      .then(() => {
        console.log("User saved successfully");
      })
      .catch((err) => {
        console.error("An error occured while saving user: ", err);
      });
  }
};

const deleteUser = async (userId) => {
  console.log("UserId to delete", userId);
  await User.deleteOne({ userId: userId })
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((err) => {
      console.error("An error occured while deleting user: ", err);
    });
};

const getUserCount = () => {
  return User.countDocuments();
};

export { connectToDB, getUser, postUser, deleteUser, getUserCount };

// TODO: fix issue that arises when a user leaves the group and returns
