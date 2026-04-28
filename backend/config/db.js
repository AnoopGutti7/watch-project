import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://127.0.0.1:27017/watch";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB ERROR:", err);
    process.exit(1);
  }
};