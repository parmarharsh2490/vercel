import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbState } from "../utils/dbState.js";

dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    dbState.isConnected = true;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return true;
  } catch (error) {
    dbState.isConnected = false;
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
