import express from "express";
import {
  signup,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  checkAuth,
} from "../controller/user.controller";
import asyncWrapper from "../middlewares/asyncWrapper";
import { validateSignup } from "../middlewares/validateSignup";
import { validateLogin } from "../middlewares/validateLogin";
import { isAuthenticated } from "../middlewares/isAuthenticates";
const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(validateSignup, asyncWrapper(signup));
router.route("/login").post(validateLogin, asyncWrapper(login));
router.route("/logout").post(asyncWrapper(logout));
router.route("/verify-email").post(asyncWrapper(verifyEmail));
router.route("/forgot-password").post(asyncWrapper(forgotPassword));
router.route("/reset-password/:token").post(asyncWrapper(resetPassword));
router.route("/profile/update").put(isAuthenticated, updateProfile);

export default router;
