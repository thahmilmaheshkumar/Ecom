import express from "express";
import {
  createOrder,
  getadminOrders,
  getUserOrders,
} from "../controller/ordercontoller.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

router.route("/create").post(auth, role("user"), createOrder);
router.route("/myorders").get(auth, role("user"), getUserOrders);
router.route("/admin/orders").get(auth, role("admin"), getadminOrders);

export default router;
