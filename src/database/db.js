import mongoose from "mongoose";
import User from "../database/models/User.js";
import errorHandler from "../errorHandler.js";

const { connect, connection } = mongoose;
const DB_BASE_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_BASE_URI
    : "mongodb://127.0.0.1:27017";

const connectToDB = (databaseName) => {
  // Connect to the specified database
  try {
    connect(DB_BASE_URI + "/" + databaseName);
    connection.on("connected", () => {
      console.log("Database connected succesfully");
    });
  } catch (err) {
    errorHandler(err, "Database Connection");
  }
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
