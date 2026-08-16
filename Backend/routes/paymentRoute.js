import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  createPayment,
  verifyPayment,
} from "../controller/pamentController.js";

const router = express.Router();

router.route("/payment/process").post(auth, role("user"), createPayment);
router.route("/payment/verify").post(auth, role("user"), verifyPayment);

export default router;
