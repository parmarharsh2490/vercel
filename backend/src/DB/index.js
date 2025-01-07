import mongoose from "mongoose";
import dotenv from "dotenv";
import { isConnected } from "../app.js";

dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    isConnected = true;
  } catch (error) {
    isConnected = error;
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
