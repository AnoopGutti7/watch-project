import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createWatch,
  getWatches,
  deleteWatch,
  getWatchesByBrand,
} from "../controllers/watchController.js";

const router = express.Router();

router.get("/", getWatches);
router.get("/brands/:brandName", getWatchesByBrand);
router.post("/", authMiddleware, createWatch);
router.delete("/:id", authMiddleware, deleteWatch);

export default router;
