import express from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
} from "../controller/authcontroller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(auth, logout);
router.route("/me").get(auth, getUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").post(resetPassword);
router.route("/password/change").post(auth, changePassword);

export default router;
