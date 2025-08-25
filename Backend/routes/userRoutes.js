import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../Controllers/userController.js";

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout", logout);

// Password Reset Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
