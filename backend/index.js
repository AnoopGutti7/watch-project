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

// ✅ CORS FIX
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
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options(/.*/, cors());

// ✅ JSON Middleware
app.use(express.json());

// ✅ Uploads Folder
const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// ✅ Static Upload Route
app.use("/uploads", express.static(uploadsPath));

// ✅ API Routes
app.use("/api/auth", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/watches", watchRouter);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err.message);
  }
};

startServer();