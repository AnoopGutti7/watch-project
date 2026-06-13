import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createOrder,
  confirmPayment,
  getOrders,
  getUserOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/confirm", confirmPayment);
router.get("/my", authMiddleware, getUserOrders);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
