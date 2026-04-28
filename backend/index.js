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

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ STATIC UPLOADS
const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use("/uploads", express.static(uploadsPath));

// ✅ ROUTES
app.use("/api/auth", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/watches", watchRouter);

// ✅ TEST
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ START SERVER
const startServer = async () => {
  try {
    await connectDB(); // 🔥 MUST WORK

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err.message);
  }
};

startServer();