import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import watchRouter from "./routes/watchRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  "https://watch-project-mmta.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("Blocked Origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

// Uploads
const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use("/uploads", express.static(uploadsPath));

// ✅ Keep routes WITHOUT /api
app.use("/auth", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/watches", watchRouter);

// Test
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err);
  }
};

startServer();