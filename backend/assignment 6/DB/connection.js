import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/assignment5");
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
  }
};
