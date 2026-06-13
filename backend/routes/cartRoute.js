import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeCartItem);
router.delete("/clear", clearUserCart);

export default router;
