import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticates";
import { createCheckoutSession, getOrders } from "../controller/order.controller";
import asyncWrapper from "../middlewares/asyncWrapper";

const router=express.Router()

router.route('/').get(isAuthenticated,asyncWrapper(getOrders))
router.route('/checkout/create-checkout-session').post(isAuthenticated,asyncWrapper(createCheckoutSession))
// router.route('/webhook').post())

export default router