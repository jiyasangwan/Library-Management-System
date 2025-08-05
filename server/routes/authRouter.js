import express from "express";
import { forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, verifyOTP, createAdmin } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router=express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.get("/logout", isAuthenticated , logout);

router.get("/me", isAuthenticated , getUser);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.put("/password/update", isAuthenticated,updatePassword);

router.post("/create-admin", isAuthenticated, upload.single("avatar"), createAdmin);

export default router;