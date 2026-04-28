import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  createWatch,
  getWatches,
  deleteWatch,
  getWatchesByBrand,
} from "../controllers/watchController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watchRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `watch-${unique}${ext}`);
  },
});

const upload = multer({ storage });

watchRouter.post("/", upload.single("image"), createWatch);
watchRouter.get("/", getWatches);
watchRouter.get("/brands/:brandName", getWatchesByBrand);
watchRouter.delete("/:id", deleteWatch);

export default watchRouter;
