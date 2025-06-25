import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticates";
import {
  createCheckoutSession,
  getOrders,
  stripeWebhook,
} from "../controller/order.controller";
import asyncWrapper from "../middlewares/asyncWrapper";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // raw body needed for Stripe
  asyncWrapper(stripeWebhook)
);
router.route("/").get(isAuthenticated, asyncWrapper(getOrders));
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, asyncWrapper(createCheckoutSession));

export default router;
